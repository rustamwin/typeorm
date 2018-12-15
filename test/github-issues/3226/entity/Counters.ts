import {Information} from "./Information";
import {OneToOne} from "../../../../src/decorator/relations/OneToOne";
import {JoinColumn} from "../../../../src/decorator/relations/JoinColumn";

export class Counters {

    @OneToOne(type => Information)
    @JoinColumn()
    information?: Information;

}
