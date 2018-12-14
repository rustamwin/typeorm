import "reflect-metadata";
import {expect} from "chai";
import {closeTestingConnections, createTestingConnections, reloadTestingDatabases} from "./../../utils/test-utils";
import {Post} from "./entity/Post";
import {Connection} from "../../../src";

describe("github issues > #3226 TypeORM wrong generate field name for relations field in embedded entity", () => {

    let connections: Connection[];
    before(async () => connections = await createTestingConnections({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    }));
    beforeEach(() => reloadTestingDatabases(connections));
    after(() => closeTestingConnections(connections));

    it("should properly generate relation column names", () => Promise.all(connections.map(async connection => {
        const postRepository = connection.getRepository(Post);
        const columns = postRepository.metadata.columns;
        const databaseColumns = columns.map(c => c.databaseName);

        expect(databaseColumns).to.have.members([
            // Post
            // Post.id
            "id",
            // Post.title
            "title",
            // Post.text
            "text",

            // Post.counters()
            "countersInformationDesc",
            // Post.counters().likes
            "countersLikes",
            // Post.counters().comments
            "countersComments",
            // Post.counters().favorites
            "countersFavorites",
            // Post.counters().information('info').description
            "countersInfoDesc",
            // Post.counters().otherCounters('testData').description
            "countersTestDataDesc",
            // Post.counters().dataWithoutPrefix('').description
            "countersDesc",

            // Post.otherCounters('testCounters')
            // Post.otherCounters('testCounters').likes
            "testCountersLikes",
            // Post.otherCounters('testCounters').comments
            "testCountersComments",
            // Post.otherCounters('testCounters').favorites
            "testCountersFavorites",
            // Post.otherCounters('testCounters').information('info').description
            "testCountersInfoDesc",
            // Post.otherCounters('testCounters').data('data').description
            "testCountersTestDataDesc",
            // Post.otherCounters('testCounters').dataWithoutPrefix('').description
            "testCountersDesc",

            // Post.countersWithoutPrefix('')
            // Post.countersWithoutPrefix('').likes
            "likes",
            // Post.countersWithoutPrefix('').comments
            "comments",
            // Post.countersWithoutPrefix('').favorites
            "favorites",
            // Post.countersWithoutPrefix('').information('info').description
            "infoDesc",
            // Post.countersWithoutPrefix('').data('data').description
            "testDataDesc",
            // Post.countersWithoutPrefix('').dataWithoutPrefix('').description
            "descr"
        ]);
    })));
});
