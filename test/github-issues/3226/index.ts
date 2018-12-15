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

    it("should properly generate relation column name", () => Promise.all(connections.map(async connection => {
        const postRepository = connection.getRepository(Post);
        const columns = postRepository.metadata.columns;
        const databaseColumns = columns.map(c => c.databaseName);

        // expect(databaseColumns).to.have.contain("countersInformationDesc");

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
        ]);
    })));
});
