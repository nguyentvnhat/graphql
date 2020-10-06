const graphql = require('graphql');
const _ = require('lodash');

const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
    GraphQLInt
} = graphql;

// dummy data
var books = [
    { name: 'Book1', genre: 'Fantacy', id: '1', authorId: '1' },
    { name: 'Book2', genre: 'Fantacy', id: '2', authorId: '2'},
    { name: 'Book3', genre: 'Sci-Fi', id: '3', authorId: '3' }
];

var authors = [
    { name: 'RichardAu01', age: 44, id: '2' },
    { name: 'RichardAu02', age: 45, id: '1' },
    { name: 'RichardAu03', age: 46, id: '3' }
];

// return value
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                //parent to get relation objects
                console.log(parent);
                return _.find(authors, { id: parent.authorId })
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                //code to get data from db/other source
                // args.id
                console.log(typeof(args.id));
                return _.find(books, { id: args.id });
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                //code to get data from db/other source
                // args.id
                console.log(typeof(args.id));
                return _.find(authors, { id: args.id });
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});
