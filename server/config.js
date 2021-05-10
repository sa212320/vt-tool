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
  'https://www.youtube.com/channel/UCauImUa4IByz95-SxBDWZTQ',
  'https://www.youtube.com/channel/UCQucf5TmsGZZPE-zpC9f5LA',
  'https://www.youtube.com/channel/UCb9Zg0yIbJEjgTQUK1LfpRg',
  'https://www.youtube.com/channel/UCB2Bq3iamct4YWmk6oQRDLw',
  'https://www.youtube.com/channel/UC24VfLW6TODSoa36tot94CQ',
  'https://www.youtube.com/channel/UCBZNHzMvze3twALODcCIBVg',
  'https://www.youtube.com/channel/UC6_38mg79k2C8HiHqOaf8rA',
  'https://www.youtube.com/channel/UC0xXBGnLzpTj61PCq7nb-jQ',
  'https://www.youtube.com/channel/UCYuCbE3H9xmR8_HSFizYFYg',
  'https://www.youtube.com/channel/UCGXEKCaYAW0u0Cs2u6Wcchg',
  'https://www.youtube.com/channel/UC-Niey71pc-Y9JDxv1-CtWQ',
  'https://www.youtube.com/channel/UCY3SeRGl6ty0I4DqVeZ5f0Q',
  'https://www.youtube.com/channel/UC1MAF6nTlnau2M_4GAg9fig',
  'https://www.youtube.com/channel/UCgC6azUmt9kRlLRuEVdsR9g',
  'https://www.youtube.com/channel/UCXe8hqIk_Yap31y7EOCMdzg',
  'https://www.youtube.com/channel/UCUV5em0AdJom3TZteqJvtfg',
  'https://www.youtube.com/channel/UCV1n5iZ_w0uDr4V7PhsDl-g',
  'https://www.youtube.com/channel/UCCihPFnCKXL6XjJOnerFp1A',
  'https://www.youtube.com/channel/UCUhP5tDqyivUMH2so81BlZQ',
  'https://www.youtube.com/channel/UCfpvwBqyWIXwI_7fTBRsbKQ',
  'https://www.youtube.com/channel/UCWbba2g-jli2Jeq2gLlWySw',
  'https://www.youtube.com/channel/UC8ilHKp2vLq6HdX3UevixWw',
  'https://www.youtube.com/channel/UCvqipeBytPdue6nHR1y-l2w',
  'https://www.youtube.com/channel/UCgL6PS1vba90zrZW9xmiwng',
  'https://www.youtube.com/channel/UCZ1_IaYQwObF32N8xzhZarw',
  'https://www.youtube.com/channel/UCF1SUToVFqwOSBZqpwbPtLA',
  'https://www.youtube.com/channel/UCvuF9ajrspvgdM9Zx2GfvgA',
  'https://www.youtube.com/channel/UCDuOtNGvUixGhH2u4SyIcTA',
  'https://www.youtube.com/channel/UCwnQ3FZFxhHg_mL_UCnMUDQ',
  'https://www.youtube.com/channel/UCPnyAzspEIi-QTt_j4Yg3Rw',
  'https://www.youtube.com/channel/UC7Z1NNED8bwxbtdslRy-XZw',
  'https://www.youtube.com/channel/UCsqUknuSgEZ2GTtDWv-f10Q',
  'https://www.youtube.com/channel/UCC1tfMhqwEeFJD3pkNhpuEg',
  'https://www.youtube.com/channel/UCDR73i_Lwp-aQSwMzUX-61A',
  'https://www.youtube.com/channel/UChlH8fg-wgknWgxdERoxKSQ',
  'https://www.youtube.com/channel/UCVpMC2Eaqks-OPUCOTRFDQA',
  'https://www.youtube.com/channel/UCCc7hISGFjS9lZ-T2Kakx7Q',
  'https://www.youtube.com/channel/UCtJ4exfMT-7kHs2VjhPio5A',
  'https://www.youtube.com/channel/UChl9chAone90455JN7RHvWw',
  'https://www.youtube.com/channel/UCIZAoDI6cvOuGiiBDE8W30w',
  'https://www.youtube.com/channel/UCuK8dcy5v5ngOEnj8RSL8Dw',
  'https://www.youtube.com/channel/UCHMCwtilDcB7Cc30D3KrqvA',
  'https://www.youtube.com/channel/UCznSbqN3e5-5-C325wT081A',
  'https://www.youtube.com/channel/UCV8iDwYHXs6GfvMhIj4e5ng',
  'https://www.youtube.com/channel/UCOnhVewJWOovqwxsb6mVwEQ',
  'https://www.youtube.com/channel/UCoXSvQDickACTDZLWUKXIeQ',
  'https://www.youtube.com/channel/UCJxsl0FdjW0FY4iqzx7mKYQ',
  'https://www.youtube.com/channel/UCqwae8F5d7iwGdf9e932K5w',
  'https://www.youtube.com/channel/UCb2xaWuXdWpMJkJ07iiQWzQ',
  'https://www.youtube.com/channel/UCEvR6lGQv3IfWBYKdxYcmuA',
  'https://www.youtube.com/channel/UCYPSP_gJ-BcREmsDzBIaRvw',
  'https://www.youtube.com/channel/UC7VNrZqdH_t8dLMdrp0NrJQ',
  'https://www.youtube.com/channel/UCcB8PaA3MpAIU-02vOWWDhg',
  'https://www.youtube.com/channel/UC3BSBOD67u9CUmpAakbhFkw',
  'https://www.youtube.com/channel/UC3ZMLedmq-ls2VApxVkmjhg',
  'https://www.youtube.com/channel/UCinWei9HIn00Qq7ts_FfY7g',
  'https://www.youtube.com/channel/UCSBG5KBsczK0mqDxGzZGJFg',
  'https://www.youtube.com/channel/UC75d0B3ZhoW439YoQdeejSQ',
  'https://www.youtube.com/channel/UCqpLIJxfSbjcUwipEmhboiw',
  'https://www.youtube.com/channel/UCgZRGc0TCCiqbg0ylhKg3Rg',
  'https://www.youtube.com/channel/UC8Qe-0ZM9KazJhtupf3qvPQ',
  'https://www.youtube.com/channel/UCDvNzvaRriONOWLP5IZuuhA',
  'https://www.youtube.com/channel/UC8cq7H51mc7jI3LbxUoQENQ',
  'https://www.youtube.com/channel/UCUvxcVyqw9fejIWE7EVDJGg',
  'https://www.youtube.com/channel/UCDyp9Sro4pyBZLnBy3uEZ9w',
  'https://www.youtube.com/channel/UCt3sb-VzKeQtomYXqAqaKPw',
  'https://www.youtube.com/channel/UCXzEDlhV7wJuMY4c-Fvz7uQ',
  'https://www.youtube.com/channel/UCd5OJP-Jvxjb-ljqLdGt6GA',
  'https://www.youtube.com/channel/UCbi8guSAh6hGpX4DU-2rpAQ',
  'https://www.youtube.com/channel/UCqipoCR5ivd9bfiv7F5OrQw',
  'https://www.youtube.com/channel/UCqZt2XLdhv1YUk3DtjHsHNg',
  'https://www.youtube.com/channel/UChQaXgbaVBSpEit0Zf0xaSQ',
  'https://www.youtube.com/channel/UCl5wbgiHC210jNLoToqhYzw',
  'https://www.youtube.com/channel/UCfDaUbNpT5h3AIsM_2Ra2ig',
  'https://www.youtube.com/channel/UCH9URGhHQ_MFnp1RlW9_Iwg',
  'https://www.youtube.com/channel/UCoXSvQDickACTDZLWUKXIeQ',
  'https://www.youtube.com/channel/UCOnhVewJWOovqwxsb6mVwEQ',
  'https://www.youtube.com/channel/UCV8iDwYHXs6GfvMhIj4e5ng',
  'https://www.youtube.com/channel/UCznSbqN3e5-5-C325wT081A',
  'https://www.youtube.com/channel/UCIZAoDI6cvOuGiiBDE8W30w',
  'https://www.youtube.com/channel/UCM1nL55m_QImE0ZRqvGmWWQ',
  'https://www.youtube.com/channel/UCgYobGgRQSOS2NMbNAGKtuw',
  'https://www.youtube.com/channel/UCHJyr2QQWGASn7FbodVh2aQ',
  'https://www.youtube.com/channel/UCPlH4u0HPfenK8Agsge6U-Q',
  'https://www.youtube.com/channel/UC4JivohUPR7gJLOZ0HiLA1A',
  'https://www.youtube.com/channel/UC2yG-9ekUwTs8Q0yMSycMxA',
  'https://www.youtube.com/channel/UC6ZXuErwflSclRQxaBYAfEg',
  'https://www.youtube.com/channel/UCR3qiQWYf6aVN6eZxXsCnwg',
  'https://www.youtube.com/channel/UCl1RVJbkPnpNbO9-CsDqPmQ',
  'https://www.youtube.com/channel/UCvgbuonmEURc7sGXLWPUYDQ',
  'https://www.youtube.com/channel/UCu1aAYNDCh42pwNHVd_rprA',
  'https://www.youtube.com/channel/UC1VHup-b6HHii5i_zeMHUpw',
  'https://www.youtube.com/channel/UCw98tGKE-K9eX9Vj6t1HT3A',
  'https://www.youtube.com/channel/UCNG95h3X6KwkAx2ufytQ2MQ',
  'https://www.youtube.com/channel/UC6HkS98pJk40VhFcAQtBBow',
  'https://www.youtube.com/channel/UC1SSk2e1e0p2uUfroD0gIBA',
  'https://www.youtube.com/channel/UC3301GJ2Wnc2FwN3hKfQqWw',
  'https://www.youtube.com/channel/UChUi326Pybx9z0nn0iH7trA',
  'https://www.youtube.com/channel/UCnR-NGGJX8LNda74LhR6T5g',
  'https://www.youtube.com/channel/UCYH8b76CrBUEfS7So_Zv09g',
  'https://www.youtube.com/channel/UC1i12Qt6ih_zDOI-8xIX3oQ',
  'https://www.youtube.com/channel/UC92miQ0lzFaQiADf3niAWmw',
  'https://www.youtube.com/channel/UCjWydMg-aHIKrAZEfAJM9Rw',
  'https://www.youtube.com/channel/UCZ1_IaYQwObF32N8xzhZarw',
  'https://www.youtube.com/channel/UCx7GU8C3cr7vqp_SbS-8P-w',
  'https://www.youtube.com/channel/UCuM709BhGrE8RzvcLoXLVfw',
  'https://www.youtube.com/channel/UCm7NvgzsGR0DsNtNYyBonLQ',
  'https://www.youtube.com/channel/UCqthXYzZr1GVxhPMffdGEMQ',
  'https://www.youtube.com/channel/UCMZ1lgefCxn0ANbwb-1q6Lw',
  'https://www.youtube.com/channel/UCQL2rhbC2hlVDbmUdPAMlJg',
  'https://www.youtube.com/channel/UCmyDLzP9ZBAK2JO4kUuJMRQ',
  'https://www.youtube.com/channel/UCuy-kZJ7HWwUU-eKv0zUZFQ',
  'https://www.youtube.com/channel/UCYPSP_gJ-BcREmsDzBIaRvw',
  'https://www.youtube.com/channel/UCdzTYscLRjx1o-0n4HWtW2A',
  'https://www.youtube.com/channel/UC78bh4h0lAIsbimlvYoQ5Aw',
  'https://www.youtube.com/channel/UCv_W2ZpvfrLAzsHqtjWGKYw',
  'https://www.youtube.com/channel/UCDMDdgB7yiYQT_Q08mXqSvg',
  'https://www.youtube.com/channel/UCN4jFjTbtW7z7nBMOHaZo-Q',
  'https://www.youtube.com/channel/UCQkiXjQ-h_jxo2t9Tvt6-QQ',
  'https://www.youtube.com/channel/UC7-W3usOUW4cy_pQsOU2x-A',
  'https://www.youtube.com/channel/UCWsKzyG_gsRB715bjNXNwaQ',
  'https://www.youtube.com/channel/UCSu05mqOOANQKqCzfIsWbBg',
  'https://www.youtube.com/channel/UCKdPcPmrNjdTIsRQLxpgzwA',
  'https://www.youtube.com/channel/UCRJa1VRDsYwaLlML0PLYcNA',
  'https://www.youtube.com/channel/UC7giliMJeLyow68hd_i0DpA',
  'https://www.youtube.com/channel/UC_BjgwcygvQatWUh06QQHwg',
  'https://www.youtube.com/channel/UCfuL6nfpOBStOrb0cwRgb6w',
  'https://www.youtube.com/channel/UCnN1HCGct3gR-ge768k5yZA',
  'https://www.youtube.com/channel/UCuPwugno-avZ_ybK8Q3w9Xw',
  'https://www.youtube.com/channel/UCv6oLxnNxHuGjidunvhdseg',
  'https://www.youtube.com/channel/UCLLbop68_DIW8bTRMOCO4iw',
  'https://www.youtube.com/channel/UCC7ZKpAOJCi1_mBaUBBQEJg',
  'https://www.youtube.com/channel/UC9gLGP1Al6npy1XiypTQ9Wg',
  'https://www.youtube.com/channel/UCFchj7okVRGh0yUPe-Lwi9g',
  'https://www.youtube.com/channel/UC7uqtUmvZTvLY5WbH_oBw_A',
  'https://www.youtube.com/channel/UCE7IKtGwecu9CifcuAjR_2A',
  'https://www.youtube.com/channel/UCN7sEdAjj4Q--al9pDsCPOg',
  'https://www.youtube.com/channel/UCgVuzUu24q8KIDOjJcmCnIQ',
  'https://www.youtube.com/channel/UCSbwSPW2xLSZs7LyBcwcmAw',
  'https://www.youtube.com/channel/UCUMwanMztK0Y-T-ns3bMR0g',
  'https://www.youtube.com/channel/UCprlKrFgmLW4F_Ec80PWuCw',
  'https://www.youtube.com/channel/UC05vNpgpEZ96Di2l2bg7-4A',
  'https://www.youtube.com/channel/UCTtBkCcFPTGqvI8MFzY3MGQ',
  'https://www.youtube.com/channel/UCabQQq9Jy4gtCij38EdsHKQ',
  'https://www.youtube.com/channel/UCsGOB7Yw1ZhThDs0Ytn45ZQ',
  'https://www.youtube.com/channel/UCRbpT1E6aqHxY0TffauHbgw',
  'https://www.youtube.com/channel/UCZFC4IJ-W_BefQdGgeO8p3g',
  'https://www.youtube.com/channel/UCWbba2g-jli2Jeq2gLlWySw',
  'https://www.youtube.com/channel/UCNkdNVoAajTdifBkONRwrcg',
  'https://www.youtube.com/channel/UC4inrFfYtl3BQtNayhSV8uw',
  'https://www.youtube.com/channel/UCAN-OUkSXeJIMHU9Iogxl7w',
  'https://www.youtube.com/channel/UCbYJ6alwTIBoyHi8tLiPVqw',
  'https://www.youtube.com/channel/UCKqetcNPf57R7kBW5xob0nw',
  'https://www.youtube.com/channel/UCMaVlKEVxJH_gXv64wv9bmg',
  'https://www.youtube.com/channel/UCttLL51poPUG5KOvk2pFOHQ',
  'https://www.youtube.com/channel/UChE0YoYwQlIZFhlPZzpuEww',
  'https://www.youtube.com/channel/UC4JivohUPR7gJLOZ0HiLA1A',
  'https://www.youtube.com/channel/UCHJyr2QQWGASn7FbodVh2aQ',
  'https://www.youtube.com/channel/UCgYobGgRQSOS2NMbNAGKtuw',
  'https://www.youtube.com/channel/UCfaF_aicMRzanfVGmSp04Hg',
  'https://www.youtube.com/channel/UColGLoTgNEZJg5eW7KZnUJQ',
  'https://www.youtube.com/channel/UCYqyub9VV7wjnZi5iyRUccw',
  'https://www.youtube.com/channel/UCRi_JcuKneF0wUCC2zKIX0w',
  'https://www.youtube.com/channel/UCsU_EiSw_cY4MNdvcNrFhHQ',
  'https://www.youtube.com/channel/UCUPFo7X6mk00JvCyCxM3QXQ',
  'https://www.youtube.com/channel/UCiMa509Rn-6XpGAklE_guMQ',
  'https://www.youtube.com/channel/UCaTCcK1ciRCCTZsVm_0-txA',
  'https://www.youtube.com/channel/UC177ZmZ6JQcpZvgqMexw-wQ',
  'https://www.youtube.com/channel/UCftYR77MPeodTgYv-3oK17w',
  'https://www.youtube.com/channel/UCWXy7kiH5Ej4FmSci_dsN-g',
  'https://www.youtube.com/channel/UCJSBNjYCB1pu_t0FajsY17g',
  'https://www.youtube.com/channel/UC5vdaDuDexicUeSTGUJCxBA',
  'https://www.youtube.com/channel/UCHtrMQI1mzpmiNr2q4zhsTw',
  'https://www.youtube.com/channel/UCzswGlm9wEIw6iB4cDVKxwg',
  'https://www.youtube.com/channel/UCXS2SawTDeN7CmHjVlAVF1w',
  'https://www.youtube.com/channel/UClyG45c__AjBYpIRGCTtjQQ',
  'https://www.youtube.com/channel/UCzswGlm9wEIw6iB4cDVKxwg',
  'https://www.youtube.com/channel/UCHtrMQI1mzpmiNr2q4zhsTw',
  'https://www.youtube.com/channel/UCXS2SawTDeN7CmHjVlAVF1w',
  'https://www.youtube.com/channel/UCZzMIhWgVB-q8irNuoi4HiQ',
  'https://www.youtube.com/channel/UC50VucABTfmaDxKk4L33QRQ',
  'https://www.youtube.com/channel/UCaH89cKtbM4SfOVZqCBjWmw',
  'https://www.youtube.com/channel/UCHPzEh-kyMZTb0_OZhntT7Q',
  'https://www.youtube.com/channel/UCXGqPhClcW5LNzrbC9Iq73A',
  'https://www.youtube.com/channel/UC7da2s8g7FXNsjiwEEGgYbg',
  'https://www.youtube.com/channel/UCaKCNIJID8zaXOZYCxjW3Yg',
  'https://www.youtube.com/channel/UC2oSg42GsQ7sdeNSUH2hpZg',
  'https://www.youtube.com/channel/UCZuQvHMvbkuPOT8MpDVgh_Q',
  'https://www.youtube.com/channel/UCsbCCK4-Z8J3PSjpk8AY3_Q',
  'https://www.youtube.com/channel/UCRbpT1E6aqHxY0TffauHbgw',
  'https://www.youtube.com/channel/UCoSGr8sdbve0cc8aXs4t4cA',
  'https://www.youtube.com/channel/UCzl1nssy194k3GYR9fMBgqQ',
  'https://www.youtube.com/channel/UCB3nyzC_7iJY22aHGiVL8jg',
  'https://www.youtube.com/channel/UC7P5GH9nvcjP120r62h3v3g',
  'https://www.youtube.com/channel/UCxh0FrXbcVnqCvZ9bE3Bpqw',
  'https://www.youtube.com/channel/UCwqWd1WJ9R1obztkPhl5MPw',
  'https://www.youtube.com/channel/UCRy4Om8mlek-PSuaGcaddoQ',
  'https://www.youtube.com/channel/UC_AMWhTw597EVk4EQdok7_Q',
  'https://www.youtube.com/channel/UCSbDnwXOfO7afJqXYMhEJ8w',
  'https://www.youtube.com/channel/UCUMwanMztK0Y-T-ns3bMR0g',
  'https://www.youtube.com/channel/UC6tjGbBzNGR3i9RHstGUvWw',
  'https://www.youtube.com/channel/UCVSROaMLGOblAlHO0pEN05g',
  'https://www.youtube.com/channel/UC7YijJTaXAfAz_E7cDR8TNw',
  'https://www.youtube.com/channel/UCSg65zANkiLAj01kRwR4MIQ',
  'https://www.youtube.com/channel/UCncQnGxk9gECVaMmJbvD0Gw',
  'https://www.youtube.com/channel/UCbyrS4bwdV8Dv2RwFmPDEZQ',
];

const newChannelIds = [
  'https://www.youtube.com/channel/UC5vdaDuDexicUeSTGUJCxBA',
  'https://www.youtube.com/channel/UCHtrMQI1mzpmiNr2q4zhsTw',
  'https://www.youtube.com/channel/UCzswGlm9wEIw6iB4cDVKxwg',
  'https://www.youtube.com/channel/UCXS2SawTDeN7CmHjVlAVF1w',
  'https://www.youtube.com/channel/UClyG45c__AjBYpIRGCTtjQQ',
  'https://www.youtube.com/channel/UCzswGlm9wEIw6iB4cDVKxwg',
  'https://www.youtube.com/channel/UCHtrMQI1mzpmiNr2q4zhsTw',
  'https://www.youtube.com/channel/UCXS2SawTDeN7CmHjVlAVF1w',
  'https://www.youtube.com/channel/UCZzMIhWgVB-q8irNuoi4HiQ',
  'https://www.youtube.com/channel/UC50VucABTfmaDxKk4L33QRQ',
  'https://www.youtube.com/channel/UCaH89cKtbM4SfOVZqCBjWmw',
  'https://www.youtube.com/channel/UCHPzEh-kyMZTb0_OZhntT7Q',
  'https://www.youtube.com/channel/UCXGqPhClcW5LNzrbC9Iq73A',
  'https://www.youtube.com/channel/UC7da2s8g7FXNsjiwEEGgYbg',
  'https://www.youtube.com/channel/UCaKCNIJID8zaXOZYCxjW3Yg',
  'https://www.youtube.com/channel/UC2oSg42GsQ7sdeNSUH2hpZg',
  'https://www.youtube.com/channel/UCZuQvHMvbkuPOT8MpDVgh_Q',
  'https://www.youtube.com/channel/UCsbCCK4-Z8J3PSjpk8AY3_Q',
  'https://www.youtube.com/channel/UCRbpT1E6aqHxY0TffauHbgw',
  'https://www.youtube.com/channel/UCoSGr8sdbve0cc8aXs4t4cA',
  'https://www.youtube.com/channel/UCzl1nssy194k3GYR9fMBgqQ',
  'https://www.youtube.com/channel/UCB3nyzC_7iJY22aHGiVL8jg',
  'https://www.youtube.com/channel/UC7P5GH9nvcjP120r62h3v3g',
  'https://www.youtube.com/channel/UCxh0FrXbcVnqCvZ9bE3Bpqw',
  'https://www.youtube.com/channel/UCwqWd1WJ9R1obztkPhl5MPw',
  'https://www.youtube.com/channel/UCRy4Om8mlek-PSuaGcaddoQ',
  'https://www.youtube.com/channel/UC_AMWhTw597EVk4EQdok7_Q',
  'https://www.youtube.com/channel/UCSbDnwXOfO7afJqXYMhEJ8w',
  'https://www.youtube.com/channel/UCUMwanMztK0Y-T-ns3bMR0g',
  'https://www.youtube.com/channel/UC6tjGbBzNGR3i9RHstGUvWw',
  'https://www.youtube.com/channel/UCVSROaMLGOblAlHO0pEN05g',
  'https://www.youtube.com/channel/UC7YijJTaXAfAz_E7cDR8TNw',
  'https://www.youtube.com/channel/UCSg65zANkiLAj01kRwR4MIQ',
  'https://www.youtube.com/channel/UCncQnGxk9gECVaMmJbvD0Gw',
  'https://www.youtube.com/channel/UCbyrS4bwdV8Dv2RwFmPDEZQ',
];

const twitchList = [
  'https://www.twitch.tv/shounenwind',
  'https://www.twitch.tv/eihraz',
  'http://www.twitch.tv/sinu150915',
]

const channelIds = [
  // guraChannelId,
  // watconChannelId,
  // test,
  ...channelIdUrl,
  // channelIdUrl[0]
];

const specialVideoUrls = [
  // 'https://youtu.be/qY5xpzAi6V8',
  // 'https://youtu.be/HWmQsRxmSKQ',
  // 'https://youtu.be/o8L4cp6tlHc',
  // 'https://youtu.be/_P9dskixuwg',
  // 'https://youtu.be/qbS5qy6O8sw',
  // 'https://youtu.be/iIcoP2bk_Yk',
  // 'https://youtu.be/QN8iOroCUzY',
  // 'https://youtu.be/Hg6iUJvV8Ss',
  // 'https://youtu.be/EAFwG56ATes',
  // 'https://youtu.be/zb_5IcfR8WU',
  // 'https://youtu.be/GjDW2BADzG8',
  // 'https://youtu.be/OaK3d4hEVOM',
  // 'https://youtu.be/RaMAp_aPrc0',
  // 'https://youtu.be/IxIONNW-6FA',
  // 'https://youtu.be/cnp0pZ3lOW0',
  'https://youtu.be/qY5xpzAi6V8',
  'https://youtu.be/HWmQsRxmSKQ',
  'https://youtu.be/Mo_IaDn_KAw',
  'https://youtu.be/UBl7I0TY63Q',
  'https://youtu.be/EcegUApfWew',
  'https://youtu.be/MAZwAo1vTQQ',
  'https://youtu.be/azLfBXOYBwY',
  'https://youtu.be/gaIGp1mevrE',
  'https://youtu.be/kV6RDTxe5zM',
  'https://youtu.be/wdCMA1N93aA',
  'https://youtu.be/nBy20TJpnlI',
  'https://youtu.be/eL775b148Xc',
  'https://youtu.be/FW6kcp13sJc',

]; 
// const channelIds = [channelIdUrl[0]];

const dbFile = 'vtuber.db';

module.exports = {channelIds, specialVideoUrls, dbFile, newChannelIds};