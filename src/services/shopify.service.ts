import { Injectable, signal } from '@angular/core';
import Client from 'shopify-buy';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ShopifyService {
    private client: Client;
    private cartSubject = new BehaviorSubject<any>(null);
    private cartOpenSubject = new BehaviorSubject<boolean>(false);
    private checkoutIdSubject = new BehaviorSubject<string | null>(null);
    private PROTECTION_VARIANT_ID = 'gid://shopify/ProductVariant/43087402270779';
    public getProtectionVariantId(): string {
        return this.PROTECTION_VARIANT_ID;
    }
    shippingProtection = signal(false);
    shippingProtectionCost = 0; // Will be set from product price

    cart$ = this.cartSubject.asObservable();
    cartOpen$ = this.cartOpenSubject.asObservable();
    checkoutId$ = this.checkoutIdSubject.asObservable();

    constructor() {
        const domain = environment.shopifyDomain || 'mock.myshopify.com';
        const storefrontAccessToken = environment.shopifyToken || 'mock_token';

        console.log('Initializing Shopify Client with:', { domain, storefrontAccessToken: storefrontAccessToken.substring(0, 5) + '...' });

        this.client = Client.buildClient({
            domain: domain,
            storefrontAccessToken: storefrontAccessToken,
            apiVersion: '2023-10'
        });

        this.initializeCheckout();
    }

    private initializeCheckout() {
        const existingCheckoutId = localStorage.getItem('shopifyCheckoutId');
        if (existingCheckoutId) {
            this.fetchCheckout(existingCheckoutId);
        } else {
            this.createCheckout();
        }
    }

    createCheckout() {
        from(this.client.checkout.create()).subscribe({
            next: (checkout) => {
                this.updateCartState(checkout);
            },
            error: (err) => console.error('Error creating checkout', err)
        });
    }

    fetchCheckout(checkoutId: string) {
        from(this.client.checkout.fetch(checkoutId)).subscribe({
            next: (checkout) => {
                // If checkout is completed, create a new one
                if (checkout && (checkout as any).completedAt) {
                    this.createCheckout();
                } else {
                    this.updateCartState(checkout);
                }
            },
            error: (err) => {
                console.error('Error fetching checkout', err);
                // Fallback to new checkout
                this.createCheckout();
            }
        });
    }

    addItemToCheckout(variantId: string, quantity: number) {
        const checkoutId = this.checkoutIdSubject.value;
        if (!checkoutId) return;

        const lineItemsToAdd = [{ variantId, quantity }];

        from(this.client.checkout.addLineItems(checkoutId, lineItemsToAdd)).subscribe({
            next: (checkout) => {
                this.updateCartState(checkout);
                this.openCart();
            },
            error: (err) => console.error('Error adding item', err)
        });
    }

    updateItemQuantity(lineItemId: string, quantity: number) {
        const checkoutId = this.checkoutIdSubject.value;
        if (!checkoutId) return;

        const lineItemsToUpdate = [{ id: lineItemId, quantity }];

        from(this.client.checkout.updateLineItems(checkoutId, lineItemsToUpdate)).subscribe({
            next: (checkout) => {
                this.updateCartState(checkout);
            },
            error: (err) => console.error('Error updating quantity', err)
        });
    }

    removeItem(lineItemId: string) {
        const checkoutId = this.checkoutIdSubject.value;
        if (!checkoutId) return;

        from(this.client.checkout.removeLineItems(checkoutId, [lineItemId])).subscribe({
            next: (checkout) => {
                this.updateCartState(checkout);
            },
            error: (err) => console.error('Error removing item', err)
        });
    }

    redirectToCheckout() {
        const checkout = this.cartSubject.value;
        if (checkout && checkout.webUrl) {
            window.location.href = checkout.webUrl;
        }
    }

    fetchProduct(handle: string): Observable<any> {
        return from(this.client.product.fetchByHandle(handle));
    }

    toggleCart() {
        this.cartOpenSubject.next(!this.cartOpenSubject.value);
    }

    openCart() {
        this.cartOpenSubject.next(true);
    }

    closeCart() {
        this.cartOpenSubject.next(false);
    }

    registerUser(firstName: string, lastName: string, email: string, pass: string): Observable<any> {
        const query = `
            mutation customerCreate($input: CustomerCreateInput!) {
              customerCreate(input: $input) {
                customer {
                  id
                  email
                }
                customerUserErrors {
                  code
                  field
                  message
                }
              }
            }
        `;

        const variables = {
            input: {
                firstName,
                lastName,
                email,
                password: pass,
                acceptsMarketing: true
            }
        };

        return from(
            fetch(`https://${environment.shopifyDomain}/api/2023-10/graphql.json`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Shopify-Storefront-Access-Token': environment.shopifyToken
                },
                body: JSON.stringify({ query, variables })
            })
        ).pipe(
            switchMap(response => from(response.json())),
            map((result: any) => {
                const data = result.data?.customerCreate;
                if (data?.customer) {
                    return data.customer;
                }
                const error = data?.customerUserErrors?.[0]?.message || 'فشل في إنشاء الحساب';
                throw new Error(error);
            })
        );
    }

    loginUser(email: string, pass: string): Observable<string> {
        const query = `
            mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
              customerAccessTokenCreate(input: $input) {
                customerAccessToken {
                  accessToken
                  expiresAt
                }
                customerUserErrors {
                  code
                  field
                  message
                }
              }
            }
        `;

        const variables = {
            input: {
                email: email,
                password: pass
            }
        };

        return from(
            fetch(`https://${environment.shopifyDomain}/api/2023-10/graphql.json`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Shopify-Storefront-Access-Token': environment.shopifyToken
                },
                body: JSON.stringify({ query, variables })
            })
        ).pipe(
            switchMap(response => from(response.json())),
            map((result: any) => {
                const data = result.data?.customerAccessTokenCreate;
                if (data?.customerAccessToken) {
                    return data.customerAccessToken.accessToken;
                }
                const error = data?.customerUserErrors?.[0]?.message || 'البريد الإلكتروني أو كلمة المرور غير صحيحة';
                throw new Error(error);
            })
        );
    }

    getCustomerInfo(token: string): Observable<any> {
        const query = `
            query getCustomerData($customerAccessToken: String!) {
              customer(customerAccessToken: $customerAccessToken) {
                firstName
                lastName
                email
                phone
                defaultAddress {
                  address1
                  city
                  country
                }
              }
            }
        `;

        const variables = {
            customerAccessToken: token
        };

        return from(
            fetch(`https://${environment.shopifyDomain}/api/2023-10/graphql.json`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Shopify-Storefront-Access-Token': environment.shopifyToken
                },
                body: JSON.stringify({ query, variables })
            })
        ).pipe(
            switchMap(response => from(response.json())),
            map((result: any) => {
                if (result.errors) {
                    throw new Error(result.errors[0].message);
                }
                return result.data?.customer;
            })
        );
    }

    getCustomerOrders(token: string): Observable<any[]> {
        const query = `
            query getCustomerOrders($customerAccessToken: String!) {
              customer(customerAccessToken: $customerAccessToken) {
                orders(first: 10, reverse: true) {
                  edges {
                    node {
                      id
                      orderNumber
                      processedAt
                      totalPrice {
                        amount
                        currencyCode
                      }
                      financialStatus
                      fulfillmentStatus
                      lineItems(first: 5) {
                        edges {
                          node {
                            title
                            quantity
                            variant {
                              image {
                                url
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
        `;

        const variables = {
            customerAccessToken: token
        };

        return from(
            fetch(`https://${environment.shopifyDomain}/api/2023-10/graphql.json`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Shopify-Storefront-Access-Token': environment.shopifyToken
                },
                body: JSON.stringify({ query, variables })
            })
        ).pipe(
            switchMap(response => from(response.json())),
            map((result: any) => {
                if (result.errors) {
                    throw new Error(result.errors[0].message);
                }
                const orders = result.data?.customer?.orders?.edges?.map((edge: any) => edge.node) || [];
                return orders;
            })
        );
    }

    isProtectionItem(item: any): boolean {
        if (!item) return false;
        const variantId = item.variant?.id || '';
        const title = item.title || '';
        return variantId === this.PROTECTION_VARIANT_ID ||
            variantId.includes(this.PROTECTION_VARIANT_ID.split('/').pop() || '!!!') ||
            title === 'Shipping Protection' ||
            item.handle === 'shipping-protection-1';
    }

    toggleShippingProtection() {
        const cart = this.cartSubject.value;
        const protectionItem = cart?.lineItems?.find((item: any) => this.isProtectionItem(item));

        if (protectionItem) {
            this.removeItem(protectionItem.id);
        } else {
            this.addItemToCheckout(this.PROTECTION_VARIANT_ID, 1);
        }
    }

    private updateCartState(checkout: any) {
        this.cartSubject.next(checkout);
        if (checkout && checkout.id) {
            this.checkoutIdSubject.next(checkout.id);
            localStorage.setItem('shopifyCheckoutId', checkout.id);

            // Check if protection is in cart
            const protectionItem = checkout.lineItems?.find((item: any) => this.isProtectionItem(item));
            this.shippingProtection.set(!!protectionItem);
            if (protectionItem) {
                this.shippingProtectionCost = parseFloat(protectionItem.variant?.price?.amount || protectionItem.variant?.price || 0);
            } else if (!this.shippingProtectionCost || this.shippingProtectionCost === 0) {
                this.shippingProtectionCost = 2.99; // Updated default for protection-1
            }
        }
    }
}
