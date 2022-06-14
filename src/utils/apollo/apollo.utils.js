import { ApolloClient, InMemoryCache, gql } from "@apollo/client";


export const client = new ApolloClient({
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache()
  });

export const runQuery = async (queryString) => {
    const response = await client.query({
      query: queryString 
  });
  return response;
  }

export const GET_ALL_PRODUCTS = gql`
  query getAllProducts {
    category(input: { title: "all" }) {
      products {
        id
        name
        gallery
        prices{
          currency{
            label
            symbol
          }
          amount
        }
      }
    }
  }
`;

export const GET_TECH_PRODUCTS = gql`
  query getAllProducts {
    category(input: { title: "tech" }) {
      products {
        id
        name
        gallery
        prices{
          currency{
            label
            symbol
          }
          amount
        }
      }
    }
  }
`;

export const GET_CLOTH_PRODUCTS = gql`
  query getAllProducts {
    category(input: { title: "clothes" }) {
      products {
        id
        name
        gallery
        prices{
          currency{
            label
            symbol
          }
          amount
        }
      }
    }
  }
`;

export const GET_ALL_CURRENCIES = gql`
query getAllCurrencies {
    currencies{
      label
      symbol
    }
}
`;

export const GET_ALL_CATEGORIES = gql`
query getAllCategories {
  categories{
    name
  }
}
`;
