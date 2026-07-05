# 11 — Interview Questions for Final Product Fit

These questions should be answered before implementation planning or after the first prototype. The spec already makes reasonable assumptions, but these answers will sharpen the product.

## Chess goals

1. What time control matters most: rapid, blitz, classical, or daily?
2. What is the target rating and timeframe: 1600, 1800, 2000?
3. Do you prefer a narrow opening repertoire or exploring many openings?
4. Do you mostly lose by tactics, bad openings, time trouble, endgames, or strategic drift?
5. How many minutes per day can you realistically train?

## Platform/import

6. What is your Chess.com username?
7. Do you also use Lichess? If yes, username?
8. Should the app import only your own games, or also model games from masters?
9. Do you want cloud AI to see selected games, or should AI be local-only?

## Engine preferences

10. Which engine should ship/be recommended first: Stockfish or user-installed only?
11. Do you want tablebase support for endgame validation?
12. Should engine analysis be fast and practical, or very deep and slower?

## AI lesson generation

13. What sources do you want to feed into the agent: books, your notes, PGN studies, videos transcripts, game comments?
14. Are those sources user-owned/licensed/public-domain?
15. Do you want generated lessons to be editable in a form UI, raw JSON editor, or both?
16. Should AI generate a full course automatically, or only one lesson at a time with review?

## UI/UX

17. Should the app look more like a training app, a chess database, or a coaching dashboard?
18. Do you want mobile/tablet later, or desktop only?
19. Do you prefer dark mode as default?
20. How much gamification do you want: streaks, XP, badges, weekly reports?

## Privacy and storage

21. Should all data stay on your machine by default?
22. Do you want encrypted backups?
23. Do you want export to PGN/JSON for portability?

## MVP priority

If we had to build only 5 things first, rank these:

- Chess.com/Lichess import.
- Engine analysis.
- Mistake-to-exercise conversion.
- Opening trainer.
- AI lesson generator.
- Lesson player.
- Personalized dashboard.
- Endgame module.
