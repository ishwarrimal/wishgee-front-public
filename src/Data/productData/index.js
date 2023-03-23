// export const productRequirementType = {
//   range: 1,
//   select: 2,
//   selectOne: 3,
//   text: 4,
//   number: 5,
//   textarea: 6,
//   nestedSelect: 7,
// };

// export const productDetails = {
//   "Mobile Phones": {
//     "Screen Size": {
//       type: productRequirementType.range,
//       unit: "inch",
//       value: [4, 5, 6, 7, 8],
//     },
//     RAM: {
//       type: productRequirementType.range,
//       unit: "gb",
//       value: [1, 2, 4, 8, 12, 16, 32],
//     },
//     Storage: {
//       type: productRequirementType.range,
//       unit: "gb",
//       value: [8, 16, 32, 64, 128, 256],
//     },
//     Camera: {
//       type: productRequirementType.range,
//       unit: "mp",
//       value: [2, 4, 8, 16, 32, 64, 256],
//     },
//   },
//   Camera: {
//     Type: {
//       type: productRequirementType.selectOne,
//       unit: "",
//       value: ["DSLR", "Mirrorless", "Digital Camera"],
//     },
//     "Effective Pixels": {
//       type: productRequirementType.range,
//       unit: "mp",
//       value: [10, 20, 40, 80],
//     },
//   },
//   Laptop: {
//     Purpose: {
//       type: productRequirementType.selectOne,
//       unit: "",
//       value: [
//         "Gaming",
//         "School/College",
//         "Programming",
//         "Media Creation",
//         "High Performance",
//       ],
//     },
//     "Screen Size": {
//       type: productRequirementType.range,
//       unit: "inches",
//       value: [12, 13, 14, 15, 16],
//     },
//     Processor: {
//       type: productRequirementType.range,
//       unit: "",
//       value: ["intel", "amd", "others"],
//     },
//     "Operating System": {
//       type: productRequirementType.selectOne,
//       unit: "",
//       value: ["DOS", "Windows", "Ubuntu", "Mac-OS"],
//     },
//     Graphics: {
//       type: productRequirementType.selectOne,
//       unit: "",
//       value: ["yes", "no"],
//     },
//   },
//   "Computer Accessories": {
//     nestedList: [
//       "Monitor",
//       // "Mouse",
//       // "Headphones",
//       // "Printer",
//       // "KeyBoard",
//       // "Microphones",
//     ],
//     nested: true,
//     Monitor: {
//       Purpose: {
//         type: productRequirementType.selectOne,
//         unit: "",
//         value: ["Entertainment", "Gaming", "Design", "Programming"],
//       },
//       "Display Size": {
//         type: productRequirementType.range,
//         unit: "inch",
//         value: [20, 24, 26, 28, 30, 32],
//       },
//       "Screen Resolution": {
//         type: productRequirementType.selectOne,
//         unit: "",
//         value: ["4K Ultra HD", "Full HD", "HD", "HD+", "SVGA"],
//       },
//       "Inbuilt Speaker": {
//         type: productRequirementType.selectOne,
//         unit: "",
//         value: ["yes", "no"],
//       },
//     },
//   },
//   "Washing Machine": {},
//   Fridge: {},
// };

export const products = {
  "totalPages": 0,
  "totalElements": 1,
  "contents": [
    {
      "id": 1,
      "title": "Phone",
      "productCategory": "phone",
      "byDate": "2020-06-26",
      "minBudget": 20000,
      "maxBudget": 50000,
      "description": "I want best mobile .... ",
      "createdTime": "2020-07-05T10:22:03.707Z",
      "updatedTime": "2020-07-05T10:22:03.707Z",
      "agent": {
            "name": "Modi Ji",
            "destination": "Prime Minister",
            "emailAddress": "support@wishgee.com"
          },
      "status": "RESOLVED",
      "type": {
        "id": 2,
        "name": "washing machine",
        "keywords": "washing machine",
        "created": "2020-08-01T08:03:26.479665",
        "updated": "2020-08-01T08:03:26.479665",
        "img": "./products/television.svg",
        "alt": "washing machine"
      },
      "response": [
        {
          "productName": "SAMSUNG G5 15 SE Ryzen 7 Octa Core 4800H - Gaming laptop)",
          "productPrice": 110000,
          "productBrand": "Apple",
          "productLink": "https://www.apple.com/in/iphone/",
          "productThumbnail": "https://images-na.ssl-images-amazon.com/images/I/51kGDXeFZKL._SL1024_.jpg",
          "keywords": "performance, battery, storage",
          "closingRemark": "Closing Mark qqqqq | apple is go od and bad",
          "alternateResult": "Alternate result ",
        }
      ]
    },
    {
      "id": 2,
      "title": "Phone",
      "productCategory": "phone",
      "byDate": "2020-06-26",
      "minBudget": 20000,
      "maxBudget": 50000,
      "description": "I want best mobile .... ",
      "createdTime": "2020-07-05T10:22:03.707Z",
      "updatedTime": "2020-07-05T10:22:03.707Z",
      "agent": {
            "name": "Modi Ji",
            "destination": "Prime Minister",
            "emailAddress": "support@wishgee.com"
          },
      "status": "REVIEWED",
      "type": {
        "id": 2,
        "name": "washing machine",
        "keywords": "washing machine",
        "created": "2020-08-01T08:03:26.479665",
        "updated": "2020-08-01T08:03:26.479665",
        "img": "./products/television.svg",
        "alt": "washing machine"
      },
      "response": [
        {
          "productName": "SAMSUNG G5 15 SE Ryzen 7 Octa Core 4800H",
          "productPrice": 110000,
          "productBrand": "Apple",
          "productLink": "https://www.apple.com/in/iphone/",
          "productThumbnail": "https://images-na.ssl-images-amazon.com/images/I/51kGDXeFZKL._SL1024_.jpg",
          "keywords": "performance, battery, storage",
          "closingRemark": "Closing Mark qqqqq",
          "alternateResult": "Alternate result ",
        }
      ]
    },
    {
      "id": 3,
      "title": "Phone",
      "productCategory": "phone",
      "byDate": "2020-06-26",
      "minBudget": 20000,
      "maxBudget": 50000,
      "description": "I want best mobile .... ",
      "createdTime": "2020-07-05T10:22:03.707Z",
      "updatedTime": "2020-07-05T10:22:03.707Z",
      "agent": {
          },
      "status": "OPEN",
      "type": {
        "id": 2,
        "name": "washing machine",
        "keywords": "washing machine",
        "created": "2020-08-01T08:03:26.479665",
        "updated": "2020-08-01T08:03:26.479665",
        "img": "./products/television.svg",
        "alt": "washing machine"
      },
      "response": []
    },
    {
      "id": 1,
      "title": "Phone",
      "productCategory": "phone",
      "byDate": "2020-06-26",
      "minBudget": 20000,
      "maxBudget": 50000,
      "description": "Looking for good camera and battery life. ",
      "createdTime": "2020-07-05T10:22:03.707Z",
      "updatedTime": "2020-07-05T10:22:03.707Z",
      "agent": {
            "name": "Modi Ji",
            "destination": "Prime Minister",
            "emailAddress": "support@wishgee.com"
          },
      "status": "RESOLVED",
      "type": {
        "id": 2,
        "name": "phone",
        "keywords": "phone",
        "created": "2020-08-01T08:03:26.479665",
        "updated": "2020-08-01T08:03:26.479665",
        "img": "./products/phone.svg",
        "alt": "phone"
      },
      "response": [
        {
          "productName": "MI 12 R",
          "productPrice": 110000,
          "productBrand": "Xiaomi",
          "productLink": "https://www.apple.com/in/iphone/",
          "productThumbnail": "https://images-na.ssl-images-amazon.com/images/I/51kGDXeFZKL._SL1024_.jpg",
          "keywords": "performance, battery, storage",
          "closingRemark": "Closing Mark qqqqq",
          "alternateResult": "Alternate result ",
        }
      ]
    },
    {
      "id": 4,
      "title": "Apple phone",
      "productCategory": "phone",
      "byDate": "2020-06-26",
      "minBudget": 20000,
      "maxBudget": 50000,
      "description": "I want best mobile .... ",
      "createdTime": "2020-07-05T10:22:03.707Z",
      "updatedTime": "2020-07-05T10:22:03.707Z",
      "agent": {
            "name": "Modi Ji",
            "destination": "Prime Minister",
            "emailAddress": "support@wishgee.com"
          },
      "status": "WAITING_FOR_APPROVAL",
      "type": {
        "id": 2,
        "name": "washing machine",
        "keywords": "washing machine",
        "created": "2020-08-01T08:03:26.479665",
        "updated": "2020-08-01T08:03:26.479665",
        "img": "./products/television.svg",
        "alt": "washing machine"
      },
      "response": [
        {
          "productName": "SAMSUNG G5 15 SE Ryzen 7 Octa Core 4800H",
          "productPrice": 110000,
          "productBrand": "Apple",
          "productLink": "https://www.apple.com/in/iphone/",
          "productThumbnail": "https://images-na.ssl-images-amazon.com/images/I/51kGDXeFZKL._SL1024_.jpg",
          "keywords": "performance, battery, storage",
          "closingRemark": "Closing Mark qqqqq",
          "alternateResult": "Alternate result ",
        }
      ]
    }
  ]
}
