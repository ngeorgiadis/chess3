// Built-in openings library: a curated set of basic openings with main line and
// key variations. Moves are SAN from the starting position; chess.js resolves
// them to FENs/UCI at display time (and validity is covered by the smoke test).

export interface OpeningLine {
  name: string
  san: string[]
  note?: string
}

export interface Opening {
  id: string
  name: string
  eco: string
  /** The side this opening is usually studied for. */
  side: 'white' | 'black'
  summary: string
  lines: OpeningLine[]
}

export const OPENINGS: Opening[] = [
  {
    id: 'italian-game',
    name: 'Italian Game',
    eco: 'C50',
    side: 'white',
    summary: 'Classical development: bishop to its most natural attacking square. Solid plans, open positions.',
    lines: [
      {
        name: 'Giuoco Piano (main line)',
        san: ['e4', 'e5', 'Nf3', 'Nc6', 'Bc4', 'Bc5', 'c3', 'Nf6', 'd3', 'd6', 'O-O', 'O-O'],
        note: 'The quiet build-up: c3 prepares d4, castle early and expand slowly.'
      },
      {
        name: 'Giuoco Piano, center push',
        san: ['e4', 'e5', 'Nf3', 'Nc6', 'Bc4', 'Bc5', 'c3', 'Nf6', 'd4', 'exd4', 'cxd4', 'Bb4+', 'Bd2', 'Bxd2+', 'Nbxd2', 'd5'],
        note: 'The sharp central break — know the ...Bb4+ resource.'
      },
      {
        name: 'Two Knights Defense',
        san: ['e4', 'e5', 'Nf3', 'Nc6', 'Bc4', 'Nf6', 'd3', 'Be7', 'O-O', 'O-O'],
        note: 'Against 3...Nf6, the modern d3 keeps a stable center.'
      }
    ]
  },
  {
    id: 'ruy-lopez',
    name: 'Ruy Lopez (Spanish)',
    eco: 'C60',
    side: 'white',
    summary: 'The most principled fight for the center: pressure on c6 undermines e5.',
    lines: [
      {
        name: 'Morphy Defense (main line)',
        san: ['e4', 'e5', 'Nf3', 'Nc6', 'Bb5', 'a6', 'Ba4', 'Nf6', 'O-O', 'Be7', 'Re1', 'b5', 'Bb3', 'd6', 'c3', 'O-O'],
        note: 'The tabiya of classical chess — both sides complete development before the fight starts.'
      },
      {
        name: 'Berlin Defense',
        san: ['e4', 'e5', 'Nf3', 'Nc6', 'Bb5', 'Nf6', 'O-O', 'Nxe4', 'd4', 'Nd6', 'Bxc6', 'dxc6', 'dxe5', 'Nf5'],
        note: 'Solid equalizing try for Black; the famous endgame structure.'
      },
      {
        name: 'Exchange Variation',
        san: ['e4', 'e5', 'Nf3', 'Nc6', 'Bb5', 'a6', 'Bxc6', 'dxc6', 'O-O', 'f6', 'd4', 'exd4', 'Nxd4'],
        note: 'White plays for the superior pawn structure in the endgame.'
      }
    ]
  },
  {
    id: 'scotch-game',
    name: 'Scotch Game',
    eco: 'C45',
    side: 'white',
    summary: 'Open the center immediately with d4. Direct piece play, fewer theory-heavy branches.',
    lines: [
      {
        name: 'Main line',
        san: ['e4', 'e5', 'Nf3', 'Nc6', 'd4', 'exd4', 'Nxd4', 'Nf6', 'Nxc6', 'bxc6', 'e5', 'Qe7', 'Qe2', 'Nd5', 'c4'],
        note: 'The Mieses variation — sharp play against the d5-knight.'
      },
      {
        name: 'Classical ...Bc5',
        san: ['e4', 'e5', 'Nf3', 'Nc6', 'd4', 'exd4', 'Nxd4', 'Bc5', 'Be3', 'Qf6', 'c3', 'Nge7'],
        note: 'Black targets d4; Be3 and c3 keep the knight anchored.'
      }
    ]
  },
  {
    id: 'sicilian-defense',
    name: 'Sicilian Defense',
    eco: 'B20',
    side: 'black',
    summary: 'The fighting reply to 1.e4: trade a wing pawn for the center and play for the win.',
    lines: [
      {
        name: 'Najdorf Variation',
        san: ['e4', 'c5', 'Nf3', 'd6', 'd4', 'cxd4', 'Nxd4', 'Nf6', 'Nc3', 'a6', 'Be2', 'e5', 'Nb3', 'Be7'],
        note: '...a6 keeps every option open; ...e5 grabs central space.'
      },
      {
        name: 'Dragon Variation',
        san: ['e4', 'c5', 'Nf3', 'd6', 'd4', 'cxd4', 'Nxd4', 'Nf6', 'Nc3', 'g6', 'Be3', 'Bg7', 'f3', 'O-O'],
        note: 'The long-diagonal bishop is the soul of the Dragon.'
      },
      {
        name: 'Classical Variation',
        san: ['e4', 'c5', 'Nf3', 'd6', 'd4', 'cxd4', 'Nxd4', 'Nf6', 'Nc3', 'Nc6', 'Be2', 'e5', 'Nb3', 'Be7'],
        note: 'Natural development first — a good first Sicilian.'
      }
    ]
  },
  {
    id: 'french-defense',
    name: 'French Defense',
    eco: 'C00',
    side: 'black',
    summary: 'Solid pawn chain, counterattack with ...c5 and ...f6. Accepts a cramped light-squared bishop.',
    lines: [
      {
        name: 'Advance Variation',
        san: ['e4', 'e6', 'd4', 'd5', 'e5', 'c5', 'c3', 'Nc6', 'Nf3', 'Qb6', 'Be2', 'cxd4', 'cxd4', 'Nh6'],
        note: 'Attack the base of the chain: c5 and Qb6 hit d4/b2.'
      },
      {
        name: 'Winawer Variation',
        san: ['e4', 'e6', 'd4', 'd5', 'Nc3', 'Bb4', 'e5', 'c5', 'a3', 'Bxc3+', 'bxc3', 'Ne7'],
        note: 'Structural imbalance: Black gives the bishop pair for damaged white pawns.'
      },
      {
        name: 'Exchange Variation',
        san: ['e4', 'e6', 'd4', 'd5', 'exd5', 'exd5', 'Nf3', 'Nf6', 'Bd3', 'Bd6', 'O-O', 'O-O'],
        note: 'Symmetrical but not dead — develop actively and fight for e-file control.'
      }
    ]
  },
  {
    id: 'caro-kann',
    name: 'Caro-Kann Defense',
    eco: 'B10',
    side: 'black',
    summary: 'The solid ...d5 defense without locking in the c8-bishop. Great pawn structures.',
    lines: [
      {
        name: 'Classical Variation',
        san: ['e4', 'c6', 'd4', 'd5', 'Nc3', 'dxe4', 'Nxe4', 'Bf5', 'Ng3', 'Bg6', 'h4', 'h6', 'Nf3', 'Nd7'],
        note: 'The bishop gets out before ...e6. Mind the h4-h5 space grab.'
      },
      {
        name: 'Advance Variation',
        san: ['e4', 'c6', 'd4', 'd5', 'e5', 'Bf5', 'Nf3', 'e6', 'Be2', 'Nd7', 'O-O', 'Ne7'],
        note: 'Same good bishop, French-like structure without the bad bishop.'
      }
    ]
  },
  {
    id: 'scandinavian',
    name: 'Scandinavian Defense',
    eco: 'B01',
    side: 'black',
    summary: 'Challenge e4 on move one. Easy to learn, clear plans — ideal first defense.',
    lines: [
      {
        name: 'Main line ...Qa5',
        san: ['e4', 'd5', 'exd5', 'Qxd5', 'Nc3', 'Qa5', 'd4', 'Nf6', 'Nf3', 'c6', 'Bc4', 'Bf5', 'Bd2', 'e6'],
        note: 'The queen sits safely on a5; ...c6 gives her a retreat.'
      },
      {
        name: 'Modern ...Qd6',
        san: ['e4', 'd5', 'exd5', 'Qxd5', 'Nc3', 'Qd6', 'd4', 'Nf6', 'Nf3', 'a6', 'Be2', 'Nc6'],
        note: 'Flexible queen placement, often with ...g6 setups.'
      }
    ]
  },
  {
    id: 'queens-gambit',
    name: "Queen's Gambit",
    eco: 'D30',
    side: 'white',
    summary: 'Offer the c-pawn to deflect Black from the center. The backbone of 1.d4 play.',
    lines: [
      {
        name: 'QGD Orthodox',
        san: ['d4', 'd5', 'c4', 'e6', 'Nc3', 'Nf6', 'Bg5', 'Be7', 'e3', 'O-O', 'Nf3', 'h6', 'Bh4', 'b6'],
        note: 'Declined: Black keeps the center and unwinds slowly.'
      },
      {
        name: 'QGD Exchange',
        san: ['d4', 'd5', 'c4', 'e6', 'Nc3', 'Nf6', 'cxd5', 'exd5', 'Bg5', 'c6', 'e3', 'Bf5'],
        note: 'The minority-attack structure — b4-b5 comes later.'
      },
      {
        name: 'Queen’s Gambit Accepted',
        san: ['d4', 'd5', 'c4', 'dxc4', 'Nf3', 'Nf6', 'e3', 'e6', 'Bxc4', 'c5', 'O-O', 'a6'],
        note: 'Black returns the pawn for quick development and ...c5.'
      }
    ]
  },
  {
    id: 'slav-defense',
    name: 'Slav Defense',
    eco: 'D10',
    side: 'black',
    summary: 'Defend d5 with ...c6 and keep the c8-bishop free. Rock-solid against the Queen’s Gambit.',
    lines: [
      {
        name: 'Main line',
        san: ['d4', 'd5', 'c4', 'c6', 'Nf3', 'Nf6', 'Nc3', 'dxc4', 'a4', 'Bf5', 'e3', 'e6', 'Bxc4', 'Bb4'],
        note: 'Take on c4 only after Nc3, then develop the bishop before ...e6.'
      },
      {
        name: 'Semi-Slav',
        san: ['d4', 'd5', 'c4', 'c6', 'Nf3', 'Nf6', 'Nc3', 'e6', 'e3', 'Nbd7', 'Bd3', 'dxc4', 'Bxc4', 'b5'],
        note: 'The Meran structure: ...dxc4 and ...b5 gain time on the bishop.'
      }
    ]
  },
  {
    id: 'london-system',
    name: 'London System',
    eco: 'D02',
    side: 'white',
    summary: 'A system, not a theory battle: Bf4, e3, c3 pyramid against almost anything.',
    lines: [
      {
        name: 'Main setup vs ...d5',
        san: ['d4', 'd5', 'Bf4', 'Nf6', 'e3', 'c5', 'c3', 'Nc6', 'Nd2', 'e6', 'Ngf3', 'Bd6', 'Bg3', 'O-O', 'Bd3'],
        note: 'The full pyramid; recapture on g3 keeps the structure intact.'
      },
      {
        name: 'vs King’s Indian setups',
        san: ['d4', 'Nf6', 'Bf4', 'g6', 'e3', 'Bg7', 'Nf3', 'O-O', 'Be2', 'd6', 'h3', 'Nbd7', 'O-O'],
        note: 'Keep the dark-squared bishop safe with h3 before Black plays ...Nh5.'
      }
    ]
  },
  {
    id: 'kings-indian',
    name: "King's Indian Defense",
    eco: 'E60',
    side: 'black',
    summary: 'Concede the center, then strike back with ...e5 or ...c5 and attack the king.',
    lines: [
      {
        name: 'Classical main line',
        san: ['d4', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'e4', 'd6', 'Nf3', 'O-O', 'Be2', 'e5', 'O-O', 'Nc6', 'd5', 'Ne7'],
        note: 'The famous race: Black attacks on the kingside, White on the queenside.'
      },
      {
        name: 'Fianchetto Variation',
        san: ['d4', 'Nf6', 'c4', 'g6', 'Nf3', 'Bg7', 'g3', 'O-O', 'Bg2', 'd6', 'O-O', 'Nbd7', 'Nc3', 'e5'],
        note: 'White’s calm setup — Black equalizes with the standard ...e5 break.'
      }
    ]
  },
  {
    id: 'nimzo-indian',
    name: 'Nimzo-Indian Defense',
    eco: 'E20',
    side: 'black',
    summary: 'Pin the knight, fight for e4, and play against doubled c-pawns. Strategically rich.',
    lines: [
      {
        name: 'Rubinstein (4.e3)',
        san: ['d4', 'Nf6', 'c4', 'e6', 'Nc3', 'Bb4', 'e3', 'O-O', 'Bd3', 'd5', 'Nf3', 'c5', 'O-O', 'Nc6'],
        note: 'Both sides develop naturally; the central tension resolves later.'
      },
      {
        name: 'Classical (4.Qc2)',
        san: ['d4', 'Nf6', 'c4', 'e6', 'Nc3', 'Bb4', 'Qc2', 'O-O', 'a3', 'Bxc3+', 'Qxc3', 'b6', 'Bg5', 'Bb7'],
        note: 'White avoids doubled pawns at the cost of time; ...b6 and ...Bb7 hit e4.'
      }
    ]
  },
  {
    id: 'english-opening',
    name: 'English Opening',
    eco: 'A10',
    side: 'white',
    summary: 'Flank control of d5. Flexible move orders that can transpose almost anywhere.',
    lines: [
      {
        name: 'Four Knights',
        san: ['c4', 'e5', 'Nc3', 'Nf6', 'Nf3', 'Nc6', 'g3', 'd5', 'cxd5', 'Nxd5', 'Bg2', 'Nb6', 'O-O', 'Be7'],
        note: 'A reversed Sicilian with an extra tempo — pressure on the long diagonal.'
      },
      {
        name: 'Symmetrical',
        san: ['c4', 'c5', 'Nc3', 'Nc6', 'g3', 'g6', 'Bg2', 'Bg7', 'Nf3', 'Nf6', 'O-O', 'O-O', 'd4', 'cxd4', 'Nxd4'],
        note: 'The main tabiya of the Symmetrical English.'
      }
    ]
  }
]
