// pages/index.js
import { ApolloClient, InMemoryCache, gql, HttpLink } from '@apollo/client';
import client from '../lib/apolloClient';

const GET_QUOTE = gql`
    query GetQuote {
        quoteOfTheDay
    }
`;

export default function Home({ quote }) {
    return (
        <div style={styles.container}>
                <div style={styles.quoteBox}>
                    <h1 style={styles.title}>Quote of the Day</h1>
                    <p style={styles.quote}>"{quote}"</p>
                </div>
            </div>
        );
    }

export async function getServerSideProps() {
    const SSRClient = new ApolloClient({
        link: new HttpLink({
            uri: 'http://localhost:8080/graphql',  // Ensure this points to port 8080
            fetch,
        }),
        cache: new InMemoryCache()
    });

    const { data } = await SSRClient.query({
        query: GET_QUOTE,
    });

    return {
        props: {
            quote: data.quoteOfTheDay,
        }
    }
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f4f4f4',
        padding: '0 20px',
    },
    quoteBox: {
        maxWidth: '800px',
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        padding: '40px',
        textAlign: 'center',
    },
    title: {
        fontSize: '2.5rem',
        color: '#333',
        marginBottom: '20px',
    },
    quote: {
        fontSize: '1.75rem',
        fontStyle: 'italic',
        color: '#555',
        lineHeight: '1.6',
    },
};

