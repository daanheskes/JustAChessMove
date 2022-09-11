const positions = [
    {
        game: "https://www.chessgames.com/perl/chessgame?gid=1250610",
        fen: "r2qk2r/ppp2ppp/2np4/2b1p3/2B1Pn2/P6P/1PPPQPP1/RNB2RK1 w kq - 1 10",
        moves: [
            { move: "Qg4", eval: "-1.0" },
            { move: "Qd1", eval: "-1.2" },
            { move: "Qf3", eval: "-3.3"}
        ]
    },
    {
        game: "https://www.chessgames.com/perl/chessgame?gid=1250610",
        fen: "r2qk2r/ppp2ppp/2np4/2b1p3/2B1Pn2/P6P/1PPP1PP1/RNB1QRK1 b kq - 2 10",
        moves: [
            { move: "Qg5", eval: "#7" },
            { move: "Pb7b5", eval: "-6.2" },
            { move: "Nc6d4",eval: "-4.8" }
        ]
    },
    {
        game: "https://www.chessgames.com/perl/chessgame?gid=1045547",
        fen: "2rr2k1/1bq1bpp1/pp2pnn1/3p3p/P1P1PP2/1PN2NPP/1B2Q1B1/R2R2K1 w - - 0 20",
        moves: [
            { move: "Pe4d5", eval: "-0.9" },
            { move: "Pc4d5", eval: "-1.8" },
            { move: "Pc4d5", eval: "-1.8" }
        ]
    },
    {
        game: "https://www.chessgames.com/perl/chessgame?gid=1789718",
        fen: "r1bqk2r/ppp2ppp/2n5/3n4/2BP4/5N2/PP1N1PPP/R2QK2R w KQkq - 0 10",
        moves: [
            { move: "Kg1", eval: "+0.1" },
            { move: "Qe2", eval: "0.0" },
            { move: "Qb3", eval: "0.0" },
            { move: "Nf3e5", eval: "0.0" },
            { move: "Qc2", eval: "-0.2" }
        ]
    }
];

export default positions;