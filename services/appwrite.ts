import { Client, Databases, ID, Query } from 'react-native-appwrite';

//setting up the app write: 
const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)

const database = new Databases(client);

//track the searches made a user

export const updateSearchCount = async (query: string, movie: Movie) => {
    /*
        check if the record of the search query has already been stored
         i. if a document is found increment the searchCount field. 
         ii. if no document is found: 
                create a new document in appwrite db => 1 (and set its value to 1)
    */
    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.equal('searchTerm', query)
        ]);

        if (result.documents.length > 0) {
            const existingMovie = result.documents[0];

            await database.updateDocument(DATABASE_ID, COLLECTION_ID, existingMovie.$id, {
                count: existingMovie.count + 1
            });
        } else {
            await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
                searchTerm: query,
                count: 1,
                poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                movie_id: movie.id,
                title: movie.title
            });
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}