interface RuneSheet {
  rowOne: number[];
  rowTwo: number[];
  rowThree: number[];
  rowfour: number[];
}

interface RuneSheetStyle {
  8000: RuneSheet;
  8100: RuneSheet;
  8200: RuneSheet;
  8300: RuneSheet;
  8400: RuneSheet;
}

export const runeData: RuneSheetStyle = {
  8000: {
    rowOne: [8005, 8008, 8021, 8010],
    rowTwo: [9101, 9111, 8009],
    rowThree: [9104, 9105, 9103],
    rowfour: [8014, 8017, 8299],
  },
  8100: {
    rowOne: [8112, 8124, 8128, 9923],
    rowTwo: [8126, 8139, 8143],
    rowThree: [8136, 8120, 8138],
    rowfour: [8135, 8134, 8105, 8106],
  },
  8200: {
    rowOne: [8214, 8229, 8230],
    rowTwo: [8224, 8226, 8275],
    rowThree: [8210, 8234, 8233],
    rowfour: [8237, 8232, 8236],
  },
  8300: {
    rowOne: [8351, 8360, 8369],
    rowTwo: [8306, 8304, 8313],
    rowThree: [8321, 8316, 8345],
    rowfour: [8347, 8410, 8352],
  },
  8400: {
    rowOne: [8437, 8439, 8465],
    rowTwo: [8446, 8463, 8401],
    rowThree: [8429, 8444, 8473],
    rowfour: [8451, 8453, 8242],
  },
};
