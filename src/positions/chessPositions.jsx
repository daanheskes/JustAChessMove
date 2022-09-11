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
            { move: "Pe4e5", eval: "-1.9" }
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
    },
    {
        game: "https://www.chessgames.com/perl/chessgame?gid=1406885",
        fen: "1r1q1rk1/pp4pn/3p3p/2p1nb2/2P2B2/2NP3P/PP2P1B1/R3QRK1 b - - 1 15",
        moves: [
            { move: "Bh3", eval: "0.0" },
            { move: "Qd7", eval: "+1.1" },
            { move: "Kh8", eval: "+1.2" },
            { move: "Qe8", eval: "+1.3" },
            { move: "Ne5g6", eval: "+1.5" }
        ]
    },
    {
        game: "https://www.chessgames.com/perl/chessgame?gid=1012278",
        fen: "rnbq1rk1/ppp1ppbp/3p1np1/3P4/2P5/2N2NP1/PP2PPBP/R1BQ1RK1 b - - 2 8",
        moves: [
            { move: "Bd7", eval: "+1.0" },
            { move: "Pa7a5", eval: "+1.1" },
            { move: "Nb8d7", eval: "+1.1" },
            { move: "Nb8a6", eval: "+1.1" },
            { move: "Pe7e5", eval: "+1.3" }          
            
        ]
    },
    {
        game: "https://www.chessgames.com/perl/chessgame?gid=1406885",
        fen: "r2qk3/pppb2r1/2pbp1N1/5n1Q/8/8/PPP2PPP/RNBR2K1 b q - 2 17",
        moves: [
            { move: "Qf6", eval: "+0.9" }
        ]
    },
    {
        game: "https://www.chessgames.com/perl/chessgame?gid=1759781",
        fen: "r1bqkbnr/1ppp2pp/p1n5/4pp2/B3P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 5",
        moves: [
            { move: "Pd2d4", eval: "+0.9" },
            { move: "Pd2d3", eval: "+0.3" },
            { move: "Bc6", eval: "+0.1" },
            { move: "Nb1c3", eval: "0.0" },
            { move: "Qe2", eval: "-0.4" }
        ]
    },
    {
        game: "https://www.chessgames.com/perl/chessgame?gid=1918233",
        fen: "rn2kb1r/1Rp2ppp/p2qpn2/5b2/8/2N2N2/P1PPBPPP/2BQ1RK1 w kq - 0 10",
        moves: [
            { move: "Pd2d4", eval: "+2.2" },
            { move: "Nf3h4", eval: "+1.0" },
            { move: "Pd2d3", eval: "+0.7" },
            { move: "Rb7b3", eval: "+0.7" },
            { move: "Rf1e1", eval: "+0.6" }
            
        ]
    },
    {
        game: "https://www.chessgames.com/perl/chessgame?gid=1647352",
        fen: "r2r2k1/1pb2ppp/p1p2n2/2Pp3q/1P6/2N1P1P1/P2BQP1P/2RR2K1 b - - 2 19",
        moves: [
            { move: "Nf6g4", eval: "-1.6" },
            { move: "Qh3", eval: "-1.0" },
            { move: "Qg6", eval: "-1.0" },
            { move: "Qf5", eval: "-0.9" },
            { move: "Qe5", eval: "-0.5" }
        ]
    },
    {
        game: "https://www.chessgames.com/perl/chessgame?gid=2017251",
        fen: "r2qk2r/1p1b1ppp/p1n1pn2/3p4/1b1P1B2/2NB1N2/PPP2PPP/R2Q1RK1 w kq - 5 10",
        moves: [
            { move: "Ph2h3", eval: "+0.4" },
            { move: "Nc3e2", eval: "+0.4" },
            { move: "Rf1e1", eval: "+0.3" },
            { move: "Pa2a3", eval: "+0.2" },
            { move: "Nc3b1", eval: "0.0" }
        ]
    },
    {
        game: "https://www.chessgames.com/perl/chessgame?gid=1812629",
        fen: "r3r1k1/p3p2p/2N3p1/1Ppn1p2/5P2/2P5/P4PKP/4RR2 w - - 0 23",
        moves: [
            { move: "Pc3c4", eval: "+1.0" },
            { move: "Re1e5", eval: "+0.6" },
            { move: "Pa2a4", eval: "0.0" },
            { move: "Rf1h1", eval: "-0.2" },
            { move: "Ph2h4", eval: "-0.2" }
        ]
    },
    {
        game: "https://www.chessgames.com/perl/chessgame?gid=1409762",
        fen: "r1b1r1k1/1p1nqpp1/p1p1p2p/3n4/3PN3/P3PN2/BPQ2PPP/2R1K2R w K - 0 14",
        moves: [
            { move: "Bb1", eval: "+1.8" },
            { move: "Nf3e5", eval: "+1.8" },
            { move: "Ne4g3", eval: "+1.5" },
            { move: "Kg1", eval: "+1.2" },
            { move: "Ph2h3", eval: "+1.2" }
            
        ]
    },
    {
        game: "https://www.chessgames.com/perl/chessgame?gid=1076206",
        fen: "r2qkbnr/ppp1n1pp/3p4/3Pp1N1/4Pp2/8/PPP3PP/RNBQ1RK1 b kq - 2 9",
        moves: [
            { move: "Ng8f6", eval: "+0.5" },
            { move: "Qd7", eval: "+1.2" },
            { move: "Qc8", eval: "+1.3" },
            { move: "Pc7c6", eval: "+1.5" },
            { move: "Ra8c8", eval: "+1.7" }
        ]
    },
    {
        game: "https://www.chessgames.com/perl/chessgame?gid=2220182",
        fen: "5kn1/p2b1q2/1p1p3p/2pP1p2/2P2P1B/2P1Q2P/P1B4K/8 w - - 11 45",
        moves: [
            { move: "Bd8", eval: "0.0" },
            { move: "Qe1", eval: "0.0" },
            { move: "Pa2a3", eval: "0.0" },
            { move: "Kg3", eval: "0.0" },
            { move: "Kg1", eval: "0.0" },
            { move: "Qe2", eval: "-0.1" },
            { move: "Qg3", eval: "-0.1" },
            { move: "Bd1", eval: "-0.1" }
        ]
    }
    // {
    //     game: "",
    //     fen: "",
    //     moves: [
    //         { move: "", eval: "" },
    //         { move: "", eval: "" },
    //         { move: "", eval: "" },
    //         { move: "", eval: "" },
    //         { move: "", eval: "" }
    //     ]
    // }
];

export default positions;