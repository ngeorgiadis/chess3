"use strict";
const electron = require("electron");
async function invoke(channel, args) {
  const res = await electron.ipcRenderer.invoke(channel, args);
  if (!res.ok) {
    const err = new Error(res.error.message);
    err.detail = res.error.detail;
    throw err;
  }
  return res.data;
}
const CHANNELS = [
  "settings:get",
  "settings:set",
  "identity:backfill",
  "games:list",
  "games:get",
  "games:moves",
  "games:delete",
  "games:exportPgn",
  "import:detect",
  "import:previewPgn",
  "import:chesscom",
  "import:lichess",
  "import:lichessGame",
  "import:pgn",
  "import:pickPgnFile",
  "engines:list",
  "engines:add",
  "engines:remove",
  "engines:verify",
  "engines:pickExecutable",
  "engines:profiles",
  "engines:saveProfile",
  "eval:setEnabled",
  "eval:status",
  "eval:position",
  "play:start",
  "play:move",
  "play:stop",
  "play:status",
  "analysis:queue",
  "analysis:cancel",
  "analysis:forGame",
  "mistakes:forGame",
  "jobs:list",
  "lessons:list",
  "lessons:get",
  "lessons:validate",
  "lessons:publish",
  "lessons:progress:get",
  "lessons:progress:set",
  "lessons:progress:all",
  "courses:list",
  "exercises:list",
  "exercises:due",
  "exercises:attempt",
  "exercises:fromMistake",
  "repertoire:list",
  "repertoire:add",
  "repertoire:addLineFromGame",
  "repertoire:addOpeningLine",
  "repertoire:due",
  "repertoire:attempt",
  "repertoire:setPriority",
  "repertoire:delete",
  "plan:today",
  "stats:overview",
  "clipboard:write",
  "ai:outline",
  "ai:generateLesson"
];
const api = {};
for (const channel of CHANNELS) {
  api[channel] = (args) => invoke(channel, args);
}
api.onEvent = (callback) => {
  const listener = (_e, payload) => callback(payload);
  electron.ipcRenderer.on("app:event", listener);
  return () => electron.ipcRenderer.removeListener("app:event", listener);
};
electron.contextBridge.exposeInMainWorld("api", api);
