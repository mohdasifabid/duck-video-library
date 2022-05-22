/**
 * Videos Database can be added here.
 * You can add videos of your wish with different attributes
 * */
import { v4 as uuid } from "uuid";
export const videos = [
  {
    _id: uuid(),
    title: "Chal Chaiya Chaiya",
    description:
      "Jinke sar ho ishq ki chaaon",
    creator: "Sukhwinder Singh | Sapna Awasthi",
    vLink: "X7sbQJi0ZE4",
    category: "music"
  },
    {
      _id: uuid(),
      title: "Yun Hi Chala Chal Lyrical Video",
      description:
        "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
      creator: "A.R Rahman",
      vLink: "eEeX2QMlSlo",
      category: "music"
    },
    {
      _id: uuid(),
      title: "Yeh Dil Deewana",
      description:
        "Pardes",
      creator: "Sonu Nigam | Shankar Mahadevan",
      vLink: "T4wr-y_bqB8",
      category: "music"
    },
    
    {
      _id: uuid(),
      title: "Meri Mehbooba Song ",
      description:
        "Pardes",
      creator: "Sonu Nigam | Alka Yagnik",
      vLink: "WkfcHsPKwds",
      category: "music"
    },
    
    {
      _id: uuid(),
      title: "Pehali Nazar Me ",
      description:
        "Race",
      creator: "Atif, Pritam",
      vLink: "BadBAMnPX0I",
      category: "music"
    },
    {
      _id: uuid(),
      title: "Khudaya Khair ",
      description:
        "Billu",
      creator: "Soham, Akruti, Monali",
      vLink:  "jq69R33z4hU",
      category: "music"
    },
    {
      _id: uuid(),
      title: "Talking Tech with Sunder Pichai ",
      description: "technology",
      creator: "ipsum loreum",
      vLink: "n2RNcPRtAiY",
      category: "tech"
    },
    {
      _id: uuid(),
      title: "Bhula Diya",
      description: "Dus Kahaniya",
      creator: "KK",
      vLink: "n9fQFFpW5S0",
      category: "music"
    },
];
