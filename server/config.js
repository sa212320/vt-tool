const guraChannelId = 'https://www.youtube.com/channel/UCoSrY_IQQVpmIRZ9Xf-y93g';
const watconChannelId = 'https://www.youtube.com/channel/UCyl1z3jo3XHR1riLFKG5UAg';
const test = 'https://www.youtube.com/channel/UCNVEsYbiZjH5QLmGeSgTSzg';

const channelIdUrl = [
  'https://www.youtube.com/user/kurodan123',
  'https://www.youtube.com/channel/UCFEd5V7VcxBPPcuMGpmvkQA',
  'https://www.youtube.com/channel/UC7yJ25m6i60LH1hBuwEDdjQ',
  'https://www.youtube.com/channel/UCzNRceCYIomBHAcdOJGCRAQ',
  'https://www.youtube.com/channel/UC4J0GZLM55qrFh2L-ZAb2LA',
  'https://www.youtube.com/channel/UCjj4xu_HzcrOr9Jsltw0gCQ',
  'https://www.youtube.com/channel/UC-o-1qjKkMLq-ZFxXIzOUBQ',
  'https://www.youtube.com/channel/UCz64YOBz4u8OM8VBE9f17BA',
  'https://www.youtube.com/channel/UCsvSrfDReAqYM32_VW8t09w',
  'https://www.youtube.com/channel/UCKazkVudNQs8ZhwfXj_RNPw',
  'https://www.youtube.com/channel/UC1d1dmxkh_yanq1U1gli7jw',
  'https://www.youtube.com/channel/UCIR0USMXU0r7N8spBJHNA7A',
  'https://www.youtube.com/channel/UCXwua0ed57b8mQPytzv3gdA',
  'https://www.youtube.com/channel/UCAVh0Elx_7eImXZ2pBMhz6A',
  'https://www.youtube.com/channel/UCjSOYNtHGZ6LTt4Zo6wPmaA',
  'https://www.youtube.com/channel/UCtfwu_vVm3yTUctd6iklzaw',
  'https://www.youtube.com/channel/UCAcPHI5Z0BkQSbFAmxcNLEQ',
  'https://www.youtube.com/channel/UCzLVOZ8QZxuA7e-l-NfPLpw',
  'https://www.youtube.com/channel/UCbk-c2dQoVcrNb_OtVgepUg',
  'https://www.youtube.com/channel/UCyQ9Lu4yE4lQxMs0SrrvNvw',
  'https://www.youtube.com/channel/UCnG1Ni-_2RJrpYJhikWrScQ',
  'https://www.youtube.com/channel/UC-IeqqrlLCTXckXexIE_T3g',
  'https://www.youtube.com/channel/UCDb47NT3QzoCiorDtK9C_qg',
  'https://www.youtube.com/channel/UCZVkCI9NKz7q9JVW9oiTQJA',
  'https://www.youtube.com/channel/UCwrdKu9P0y7D2SXrCNbjRyQ',
  'https://www.youtube.com/channel/UC8k8tOQXY74PjfYQAGnvvVA',
  'https://www.youtube.com/channel/UCDHM_49YlYNTCvACcool0Gg',
  'https://www.youtube.com/channel/UC73PP6xCYSgJ6HDVAvCQxUw',
  'https://www.youtube.com/channel/UCf-dCuo23jTbhPGsBC3nuLg',
  'https://www.youtube.com/channel/UCrDNMQM1YpexjMEpWlShD5g',
  'https://www.youtube.com/channel/UCQymE4njJ-t9oahwX9-iC8w',
  'https://www.youtube.com/channel/UCsp6KafXBam2gr_t2iV-olg',
  'https://www.youtube.com/channel/UChlH8fg-wgknWgxdERoxKSQ',
  'https://www.youtube.com/channel/UCRfdQ6WUwxfkXKQ0R0r81ew',
  'https://www.youtube.com/channel/UC1MAF6nTlnau2M_4GAg9fig',
  'https://www.youtube.com/channel/UCHY_rg6fS00UmqiYHcb_qHw',
  'https://www.youtube.com/channel/UCs_IVAqpWMnsb9bbDi7UMxw',
  'https://www.youtube.com/channel/UCGmas19xhHiPiZr9Y3xLgJw',
  'https://www.youtube.com/channel/UC05vNpgpEZ96Di2l2bg7-4A',
  'https://www.youtube.com/channel/UCinWei9HIn00Qq7ts_FfY7g',
  'https://www.youtube.com/channel/UCS8_3lt1UQlgFxN8BPf0lmA',
  'https://www.youtube.com/channel/UCBkmM4-TFIWo7n1T-3LR2Hg',
  'https://www.youtube.com/channel/UCAVh0Elx_7eImXZ2pBMhz6A',
  'https://www.youtube.com/channel/UCEThsdDQzJ0GpHvyh__aKcA',
  'https://www.youtube.com/channel/UC0ym0eQcB8HPnxbi__TeuxA',
  'https://www.youtube.com/channel/UCh-Q3CeZo3C9TUFIGAWByig',
  'https://www.youtube.com/channel/UCqsxSVegfLuA24QSVqGOtrQ',
  'https://www.youtube.com/channel/UCqsxSVegfLuA24QSVqGOtrQ',
  'https://www.youtube.com/channel/UCQymE4njJ-t9oahwX9-iC8w',
  'https://www.youtube.com/channel/UCjXpA7CBwVEVXuiQostEvYQ',
  'https://www.youtube.com/channel/UCDyp9Sro4pyBZLnBy3uEZ9w',
  'https://www.youtube.com/channel/UCKv_kzZx0yja3TzN4RyuFDA',
  'https://www.youtube.com/channel/UC45JQZfmklSB9ipib4vQEhw',
  'https://www.youtube.com/channel/UCuX1VwnUxedIdihEhiVbACw',
  'https://www.youtube.com/channel/UCGoddwjppco6a8C1AtqZW9Q',
  'https://www.youtube.com/channel/UC-uFyVEjZgI9cX-ozKqD0iA',
  'https://www.youtube.com/channel/UCtWuTDvZeZ09COJ2SjfESzQ',
  'https://www.youtube.com/channel/UCaN_Pq3x9pzhb7t9KhxQm8Q',
  'https://www.youtube.com/channel/UC262ifYFjsiCaLM3JaXv3AQ',
  'https://www.youtube.com/channel/UCW21m4m4Sqg5eM2EEh-o1JA',
  'https://www.youtube.com/channel/UCW1NDsRkcxldlZNTUsdUyBQ',
  'https://www.youtube.com/channel/UCtKyM4DA8CyCAm5LGsvUsag',
  'https://www.youtube.com/channel/UCSOpxKLXctMuO3Q1LFSHs_Q',
];

const twitchList = [
  'https://www.twitch.tv/shounenwind',
  'https://www.twitch.tv/eihraz',
]

const channelIds = [
  // guraChannelId,
  // watconChannelId,
  // test,
  ...channelIdUrl,
  // channelIdUrl[0]
];

// const channelIds = [channelIdUrl[0]];

const dbFile = 'vtuber.db';

module.exports = {channelIds, dbFile};