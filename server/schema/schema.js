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
    { name: 'Book1', genre: 'Fantacy', id: '1' },
    { name: 'Book2', genre: 'Fantacy', id: '2'},
    { name: 'Book3', genre: 'Sci-Fi', id: '3' }
];

var authors = [
    { name: 'Richard01', age: 44, id: '1' },
    { name: 'Richard02', age: 45, id: '2' },
    { name: 'Richard03', age: 46, id: '3' }
];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        id: { type: GraphQLID }
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
