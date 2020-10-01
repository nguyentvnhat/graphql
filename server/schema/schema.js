const graphql = require('graphql');

const { GraphQLObjType.GraphQLString } = graphql;

const BookType = new GraphQLObjType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        genre: { type: GraphQLString }
    })
});