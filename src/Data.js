var Data = {
  items: [
    {
      id: 1,
      name: "Manifest",
      category: "drama",
      featured: true,
      image:
        "https://img.nbc.com/sites/nbcunbc/files/images/2021/2/18/Manifest-S3-KeyArt-Logo-Vertical-852x1136.jpg",
    },
    {
      id: 2,
      name: "Dateline",
      category: "news",
      image:
        "https://img.nbc.com/sites/nbcunbc/files/images/2019/9/29/Dateline-S28-KeyArt-Logo-Vertical-852x1136.jpg",
    },
    {
      id: 3,
      name: "Americas Got Talent",
      category: "reality",
      image:
        "https://img.nbc.com/sites/nbcunbc/files/images/2021/5/12/AGT_S16-KeyArt-Logo-Vertical-852x1136.jpg",
      featured: true,
    },
    {
      id: 4,
      name: "Good Girls",
      category: "drama",
      featured: true,
      image:
        "https://img.nbc.com/sites/nbcunbc/files/images/2021/2/11/GoodGirls_S4-KeyArt-Logo-Vertical-852x1136.jpg",
    },
    {
      id: 5,
      name: "American Ninja Warrior",
      category: "reality",
      image:
        "https://img.nbc.com/sites/nbcunbc/files/images/2021/4/30/ANW_S13-KeyArt-Logo-Vertical-852x1136.jpg",
      featured: true,
    },
    {
      id: 6,
      name: "Below Deck",
      category: "comedy",
      featured: true,
      image:
        "https://img.nbc.com/sites/nbcunbc/files/images/2021/6/23/BDM-S6-KeyArt-Logo-Vertical-852x1136.jpg",
    },
    {
      id: 7,
      name: "This is Us",
      category: "drama",
      image:
        "https://img.nbc.com/sites/nbcunbc/files/images/2020/10/09/TIU_S4-KeyArt-Logo-Vertical-852x1136.jpg",
      featured: true,
    },
    {
      id: 8,
      name: "Law & Order",
      category: "drama",
      image:
        "https://img.nbc.com/sites/nbcunbc/files/images/2020/10/27/LOSVU_S22-KeyArt-Logo-Vertical-852x1136.jpg",
      featured: false,
    },
    {
      id: 9,
      name: "Nightly News",
      category: "news",
      image:
        "https://img.nbc.com/sites/nbcunbc/files/images/2019/1/22/Nightly_News-KeyArt-Logo-Vertical-852x1136.jpg",
    },
    {
      id: 10,
      name: "Blacklist",
      category: "drama",
      image:
        "https://img.nbc.com/sites/nbcunbc/files/images/2020/10/14/Blacklist-S8-KeyArt-Logo-Vertical-852x1136.jpg",
    },
  ],
};
if (localStorage.getItem("data") == null) {
  localStorage.setItem("data", JSON.stringify(Data));
} else {
  Data = JSON.parse(localStorage.getItem("data"));
}

export default Data;
