import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShopifyService {
  private readonly apiUrl = `https://${environment.shopify.domain}/api/${environment.shopify.version}/graphql.json`;
  private shippingProtectionVariantId: string | null = null;

  async getProducts(count: number = 20) {
    const query = `
      {
        products(first: ${count}) {
          edges {
            node {
              id
              title
              handle
              description
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              images(first: 5) {
                edges {
                  node {
                    url
                    altText
                  }
                }
              }
              variants(first: 10) {
                edges {
                  node {
                    id
                    title
                    price {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': environment.shopify.storefrontToken
        },
        body: JSON.stringify({ query })
      });

      if (!response.ok) {
        throw new Error(`Shopify API Error: ${response.status}`);
      }

      const data = await response.json();

      if (data.errors) {
        console.error('GraphQL Errors:', data.errors);
        return [];
      }

      const allProducts = data.data.products.edges.map((edge: any) => {
        const node = edge.node;
        const mapped = {
          id: node.id,
          title: node.title,
          handle: node.handle,
          description: node.description,
          price: parseFloat(node.priceRange.minVariantPrice.amount),
          currency: node.priceRange.minVariantPrice.currencyCode,
          imageUrl: node.images.edges[0]?.node.url || '',
          images: node.images.edges.map((imgEdge: any) => imgEdge.node.url),
          variants: node.variants.edges.map((varEdge: any) => ({
            id: varEdge.node.id,
            title: varEdge.node.title,
            price: parseFloat(varEdge.node.price.amount)
          }))
        };

        // Capture Shipping Protection ID if we see it
        if (mapped.title === 'Shipping Protection' && mapped.variants.length > 0) {
          this.shippingProtectionVariantId = mapped.variants[0].id;
        }

        return mapped;
      });

      return allProducts.filter((product: any) => product.title !== 'Shipping Protection');

    } catch (error) {
      console.error('Fetch error:', error);
      return [];
    }
  }

  async getProductByHandle(handle: string) {
    const query = `
      {
        productByHandle(handle: "${handle}") {
          id
          title
          handle
          description
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
            maxVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 10) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 20) {
            edges {
              node {
                id
                title
                price {
                  amount
                  currencyCode
                }
                compareAtPrice {
                    amount
                    currencyCode
                }
                image {
                    url
                }
              }
            }
          }
        }
      }
    `;

    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': environment.shopify.storefrontToken
        },
        body: JSON.stringify({ query })
      });

      const data = await response.json();
      const node = data.data.productByHandle;

      if (!node) return null;

      const variants = node.variants.edges.map((varEdge: any) => ({
        id: varEdge.node.id,
        name: varEdge.node.title,
        title: varEdge.node.title,
        price: parseFloat(varEdge.node.price.amount),
        compareAtPrice: varEdge.node.compareAtPrice ? parseFloat(varEdge.node.compareAtPrice.amount) : parseFloat(varEdge.node.price.amount),
        image: varEdge.node.image?.url
      }));

      return {
        id: node.id,
        title: node.title,
        handle: node.handle,
        description: node.description,
        price: parseFloat(node.priceRange.minVariantPrice.amount),
        compareAtPrice: parseFloat(node.priceRange.maxVariantPrice.amount),
        currency: node.priceRange.minVariantPrice.currencyCode,
        imageUrl: node.images.edges[0]?.node.url || '',
        images: node.images.edges.map((imgEdge: any) => imgEdge.node.url),
        variants: variants,
        bundles: variants.map((v: any) => ({
          id: v.id,
          title: v.title,
          subtitle: v.title,
          quantity: 1,
          price: v.price,
          compareAtPrice: v.compareAtPrice,
          savings: v.compareAtPrice - v.price
        }))
      };

    } catch (error) {
      console.error('Fetch product error:', error);
      return null;
    }
  }

  async createCart(lineItems: { variantId: string, quantity: number }[]) {
    const query = `
      mutation cartCreate($input: CartInput) {
        cartCreate(input: $input) {
          cart {
            id
            checkoutUrl
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    const variables = {
      input: {
        lines: lineItems.map(item => ({
          merchandiseId: item.variantId,
          quantity: item.quantity
        }))
      }
    };

    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': environment.shopify.storefrontToken
        },
        body: JSON.stringify({ query, variables })
      });

      const data = await response.json();
      if (data.errors) {
        console.error('GraphQL Errors:', data.errors);
        throw new Error(data.errors[0].message);
      }

      const cartCreate = data.data.cartCreate;
      if (cartCreate.userErrors && cartCreate.userErrors.length > 0) {
        console.error('Shopify User Errors:', cartCreate.userErrors);
        throw new Error(cartCreate.userErrors[0].message);
      }

      return cartCreate;
    } catch (error) {
      console.error('Cart creation error details:', error);
      throw error;
    }
  }

  async getShippingProtectionVariantId() {
    if (this.shippingProtectionVariantId) return this.shippingProtectionVariantId;

    // If not found yet, try fetching it once
    await this.getProducts(50);

    return this.shippingProtectionVariantId;
  }
  async subscribeToNewsletter(email: string) {
    const query = `
      mutation customerEmailMarketingSubscribe($input: CustomerEmailMarketingSubscribeInput!) {
        customerEmailMarketingSubscribe(input: $input) {
          customer {
            id
            email
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    const variables = {
      input: {
        email: email
      }
    };

    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': environment.shopify.storefrontToken
        },
        body: JSON.stringify({ query, variables })
      });

      const data = await response.json();
      if (data.errors) {
        console.error('GraphQL Errors:', data.errors);
        throw new Error(data.errors[0].message);
      }

      const result = data.data.customerEmailMarketingSubscribe;
      if (result.userErrors && result.userErrors.length > 0) {
        throw new Error(result.userErrors[0].message);
      }

      return result.customer;
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      throw error;
    }
  }

  async loginCustomer(email: string, password: string) {
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
        email,
        password
      }
    };

    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': environment.shopify.storefrontToken
        },
        body: JSON.stringify({ query, variables })
      });

      const data = await response.json();
      if (data.errors) {
        console.error('GraphQL Errors:', data.errors);
        throw new Error(data.errors[0].message);
      }

      const result = data.data.customerAccessTokenCreate;
      if (result.customerUserErrors && result.customerUserErrors.length > 0) {
        // Return null or throw specific error to indicate failure
        throw new Error(result.customerUserErrors[0].message);
      }

      return result.customerAccessToken;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async getCustomer(accessToken: string) {
    const query = `
      query {
        customer(customerAccessToken: "${accessToken}") {
          firstName
          lastName
          email
          phone
          defaultAddress {
             address1
             city
             country
             zip
          }
          orders(first: 10, reverse: true) {
            edges {
              node {
                orderNumber
                processedAt
                fulfillmentStatus
                financialStatus
                totalPrice {
                  amount
                  currencyCode
                }
                lineItems(first: 5) {
                  edges {
                    node {
                      title
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

    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': environment.shopify.storefrontToken
        },
        body: JSON.stringify({ query })
      });

      const data = await response.json();
      if (data.errors) {
        console.error('GraphQL Errors:', data.errors);
        throw new Error(data.errors[0].message);
      }

      return data.data.customer;
    } catch (error) {
      console.error('Get Customer error:', error);
      throw error;
    }
  }

  async createCustomer(email: string, password: string, firstName: string, lastName: string) {
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
        email,
        password,
        firstName,
        lastName
      }
    };

    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': environment.shopify.storefrontToken
        },
        body: JSON.stringify({ query, variables })
      });

      const data = await response.json();
      if (data.errors) {
        throw new Error(data.errors[0].message);
      }

      const result = data.data.customerCreate;
      if (result.customerUserErrors && result.customerUserErrors.length > 0) {
        throw new Error(result.customerUserErrors[0].message);
      }

      return result.customer;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }
}
