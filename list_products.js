
async function listProducts() {
    const domain = 't0rnr4-fy.myshopify.com';
    const token = '54026bac796ae0cba1e4361f184a6a49';

    const query = `
    {
      products(first: 20) {
        edges {
          node {
            id
            title
            handle
            variants(first: 5) {
              edges {
                node {
                  id
                  title
                  price {
                    amount
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

    const response = await fetch(`https://${domain}/api/2023-10/graphql.json`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token': token
        },
        body: JSON.stringify({ query })
    });

    const json = await response.json();
    console.log(JSON.stringify(json, null, 2));
}

listProducts();
