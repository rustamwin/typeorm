import {Information} from "./Information";
import {Column} from "../../../../src/decorator/columns/Column";
import {OneToOne} from "../../../../src/decorator/relations/OneToOne";
import {JoinColumn} from "../../../../src/decorator/relations/JoinColumn";

export class Counters {
    @Column()
    likes: number;

    @Column()
    comments: number;

    @Column()
    favorites: number;

    @OneToOne(type => Information)
    @JoinColumn()
    information?: Information;

    @Column(type => Information, {prefix: "testData"})
    data: Information;

    @Column(type => Information, {prefix: ""})
    dataWithoutPrefix: Information;
}
