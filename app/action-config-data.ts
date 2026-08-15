export type ActionConfigAction = {
  startFrame: number;
  endFrame: number;
  startSec: number;
  endSec: number;
  actionText: string;
  skill: string;
};

export type ActionConfigRecord = {
  id: string;
  taskId: number;
  episodeId: string;
  taskName: string;
  duration: number;
  frameCount: number;
  sourceFps: number;
  samplingFps: number;
  latencySec: number;
  success: boolean;
  observedSummary: string;
  actions: ActionConfigAction[];
};

export const actionConfigRecords: Record<string, ActionConfigRecord> = {
  "libero_long_000": {
    "id": "libero_long_000",
    "taskId": 0,
    "episodeId": "demo_49",
    "taskName": "KITCHEN SCENE3 turn on the stove and put the moka pot on it",
    "duration": 13.6,
    "frameCount": 272,
    "sourceFps": 20.0,
    "samplingFps": 8.0,
    "latencySec": 20.505,
    "success": true,
    "observedSummary": "A robot arm turns on the stove knob, then picks up a moka pot from the table and places it on the lit burner.",
    "actions": [
      {
        "startFrame": 0,
        "endFrame": 100,
        "startSec": 0.0,
        "endSec": 5.0,
        "actionText": "Turn on the stove knob using the right hand",
        "skill": "rotate"
      },
      {
        "startFrame": 100,
        "endFrame": 180,
        "startSec": 5.0,
        "endSec": 9.0,
        "actionText": "Pick up the moka pot using the right hand",
        "skill": "pick"
      },
      {
        "startFrame": 180,
        "endFrame": 272,
        "startSec": 9.0,
        "endSec": 13.6,
        "actionText": "Place the moka pot on the stove burner",
        "skill": "place"
      }
    ]
  },
  "libero_long_001": {
    "id": "libero_long_001",
    "taskId": 1,
    "episodeId": "demo_49",
    "taskName": "KITCHEN SCENE4 put the black bowl in the bottom drawer of the cabinet and close it",
    "duration": 12.6,
    "frameCount": 252,
    "sourceFps": 20.0,
    "samplingFps": 8.0,
    "latencySec": 19.12,
    "success": true,
    "observedSummary": "A robot arm picks up a black bowl from the table, places it into the open bottom drawer of a cabinet, and then closes the drawer.",
    "actions": [
      {
        "startFrame": 0,
        "endFrame": 105,
        "startSec": 0.0,
        "endSec": 5.25,
        "actionText": "Pick up the black bowl from the table using the right hand",
        "skill": "pick"
      },
      {
        "startFrame": 105,
        "endFrame": 210,
        "startSec": 5.25,
        "endSec": 10.5,
        "actionText": "Place the black bowl into the bottom drawer of the cabinet",
        "skill": "place"
      },
      {
        "startFrame": 210,
        "endFrame": 252,
        "startSec": 10.5,
        "endSec": 12.6,
        "actionText": "Close the bottom drawer of the cabinet",
        "skill": "close"
      }
    ]
  },
  "libero_long_002": {
    "id": "libero_long_002",
    "taskId": 2,
    "episodeId": "demo_49",
    "taskName": "KITCHEN SCENE6 put the yellow and white mug in the microwave and close it",
    "duration": 14.75,
    "frameCount": 295,
    "sourceFps": 20.0,
    "samplingFps": 8.0,
    "latencySec": 19.273,
    "success": true,
    "observedSummary": "A robot arm picks up a yellow and white mug from the table, places it inside an open microwave, and then closes the microwave door.",
    "actions": [
      {
        "startFrame": 0,
        "endFrame": 115,
        "startSec": 0.0,
        "endSec": 5.75,
        "actionText": "Pick up the yellow and white mug from the table using the right hand",
        "skill": "pick"
      },
      {
        "startFrame": 115,
        "endFrame": 200,
        "startSec": 5.75,
        "endSec": 10.0,
        "actionText": "Place the yellow and white mug into the microwave",
        "skill": "place"
      },
      {
        "startFrame": 200,
        "endFrame": 295,
        "startSec": 10.0,
        "endSec": 14.75,
        "actionText": "Close the microwave door using the right hand",
        "skill": "close"
      }
    ]
  },
  "libero_long_003": {
    "id": "libero_long_003",
    "taskId": 3,
    "episodeId": "demo_49",
    "taskName": "KITCHEN SCENE8 put both moka pots on the stove",
    "duration": 17.55,
    "frameCount": 351,
    "sourceFps": 20.0,
    "samplingFps": 8.0,
    "latencySec": 21.914,
    "success": true,
    "observedSummary": "A robot arm sequentially picks up two moka pots from the table and places them onto the stove burner.",
    "actions": [
      {
        "startFrame": 0,
        "endFrame": 105,
        "startSec": 0.0,
        "endSec": 5.25,
        "actionText": "Pick up the moka pot in the center of the table",
        "skill": "pick"
      },
      {
        "startFrame": 105,
        "endFrame": 195,
        "startSec": 5.25,
        "endSec": 9.75,
        "actionText": "Place the moka pot on the stove",
        "skill": "place"
      },
      {
        "startFrame": 195,
        "endFrame": 285,
        "startSec": 9.75,
        "endSec": 14.25,
        "actionText": "Pick up the moka pot on the right side of the table",
        "skill": "pick"
      },
      {
        "startFrame": 285,
        "endFrame": 351,
        "startSec": 14.25,
        "endSec": 17.55,
        "actionText": "Place the moka pot on the stove next to the first one",
        "skill": "place"
      }
    ]
  },
  "libero_long_004": {
    "id": "libero_long_004",
    "taskId": 4,
    "episodeId": "demo_49",
    "taskName": "LIVING ROOM SCENE1 put both the alphabet soup and the cream cheese box in the basket",
    "duration": 14.6,
    "frameCount": 292,
    "sourceFps": 20.0,
    "samplingFps": 8.0,
    "latencySec": 23.589,
    "success": true,
    "observedSummary": "A robot arm picks up a blue and yellow can from the table and places it into a basket on the right, then picks up a small blue box and places it into the same basket.",
    "actions": [
      {
        "startFrame": 0,
        "endFrame": 74,
        "startSec": 0.0,
        "endSec": 3.7,
        "actionText": "Pick up the blue and yellow can using the right hand",
        "skill": "pick"
      },
      {
        "startFrame": 74,
        "endFrame": 168,
        "startSec": 3.7,
        "endSec": 8.4,
        "actionText": "Place the blue and yellow can into the basket",
        "skill": "place"
      },
      {
        "startFrame": 168,
        "endFrame": 230,
        "startSec": 8.4,
        "endSec": 11.5,
        "actionText": "Pick up the small blue box using the right hand",
        "skill": "pick"
      },
      {
        "startFrame": 230,
        "endFrame": 292,
        "startSec": 11.5,
        "endSec": 14.6,
        "actionText": "Place the small blue box into the basket",
        "skill": "place"
      }
    ]
  },
  "libero_long_005": {
    "id": "libero_long_005",
    "taskId": 5,
    "episodeId": "demo_49",
    "taskName": "LIVING ROOM SCENE2 put both the alphabet soup and the tomato sauce in the basket",
    "duration": 13.9,
    "frameCount": 278,
    "sourceFps": 20.0,
    "samplingFps": 8.0,
    "latencySec": 21.356,
    "success": true,
    "observedSummary": "The robot arm sequentially picks up a blue can and a red can from the table and places them into the basket on the right.",
    "actions": [
      {
        "startFrame": 0,
        "endFrame": 95,
        "startSec": 0.0,
        "endSec": 4.75,
        "actionText": "Pick up the blue can using the right hand",
        "skill": "pick"
      },
      {
        "startFrame": 95,
        "endFrame": 175,
        "startSec": 4.75,
        "endSec": 8.75,
        "actionText": "Place the blue can into the basket",
        "skill": "place"
      },
      {
        "startFrame": 175,
        "endFrame": 245,
        "startSec": 8.75,
        "endSec": 12.25,
        "actionText": "Pick up the red can using the right hand",
        "skill": "pick"
      },
      {
        "startFrame": 245,
        "endFrame": 278,
        "startSec": 12.25,
        "endSec": 13.9,
        "actionText": "Place the red can into the basket",
        "skill": "place"
      }
    ]
  },
  "libero_long_006": {
    "id": "libero_long_006",
    "taskId": 6,
    "episodeId": "demo_49",
    "taskName": "LIVING ROOM SCENE2 put both the cream cheese box and the butter in the basket",
    "duration": 12.7,
    "frameCount": 254,
    "sourceFps": 20.0,
    "samplingFps": 8.0,
    "latencySec": 21.415,
    "success": true,
    "observedSummary": "A robot arm picks up a blue box from the table and places it into a basket on the right, then picks up a small orange box and places it into the same basket.",
    "actions": [
      {
        "startFrame": 0,
        "endFrame": 75,
        "startSec": 0.0,
        "endSec": 3.75,
        "actionText": "Pick up the blue box using the right hand",
        "skill": "pick"
      },
      {
        "startFrame": 75,
        "endFrame": 150,
        "startSec": 3.75,
        "endSec": 7.5,
        "actionText": "Place the blue box into the basket",
        "skill": "place"
      },
      {
        "startFrame": 150,
        "endFrame": 210,
        "startSec": 7.5,
        "endSec": 10.5,
        "actionText": "Pick up the orange box using the right hand",
        "skill": "pick"
      },
      {
        "startFrame": 210,
        "endFrame": 254,
        "startSec": 10.5,
        "endSec": 12.7,
        "actionText": "Place the orange box into the basket",
        "skill": "place"
      }
    ]
  },
  "libero_long_007": {
    "id": "libero_long_007",
    "taskId": 7,
    "episodeId": "demo_49",
    "taskName": "LIVING ROOM SCENE5 put the white mug on the left plate and put the yellow and white mug on the right plate",
    "duration": 13.35,
    "frameCount": 267,
    "sourceFps": 20.0,
    "samplingFps": 8.0,
    "latencySec": 24.425,
    "success": true,
    "observedSummary": "A dual-arm robot picks up a white mug with its left arm and places it on the left plate, then picks up a yellow and white mug with its right arm and places it on the right plate.",
    "actions": [
      {
        "startFrame": 0,
        "endFrame": 100,
        "startSec": 0.0,
        "endSec": 5.0,
        "actionText": "Pick up the white mug using the left hand",
        "skill": "pick"
      },
      {
        "startFrame": 100,
        "endFrame": 180,
        "startSec": 5.0,
        "endSec": 9.0,
        "actionText": "Place the white mug on the left plate using the left hand",
        "skill": "place"
      },
      {
        "startFrame": 180,
        "endFrame": 230,
        "startSec": 9.0,
        "endSec": 11.5,
        "actionText": "Pick up the yellow and white mug using the right hand",
        "skill": "pick"
      },
      {
        "startFrame": 230,
        "endFrame": 267,
        "startSec": 11.5,
        "endSec": 13.35,
        "actionText": "Place the yellow and white mug on the right plate using the right hand",
        "skill": "place"
      }
    ]
  },
  "libero_long_008": {
    "id": "libero_long_008",
    "taskId": 8,
    "episodeId": "demo_49",
    "taskName": "LIVING ROOM SCENE6 put the white mug on the plate and put the chocolate pudding to the right of the plate",
    "duration": 10.4,
    "frameCount": 208,
    "sourceFps": 20.0,
    "samplingFps": 8.0,
    "latencySec": 23.928,
    "success": true,
    "observedSummary": "The robot arm picks up the white mug from the table, places it onto the pink plate, and then picks up the chocolate pudding box to position it to the right of the plate.",
    "actions": [
      {
        "startFrame": 0,
        "endFrame": 58,
        "startSec": 0.0,
        "endSec": 2.9,
        "actionText": "Pick up the white mug using the right hand",
        "skill": "pick"
      },
      {
        "startFrame": 58,
        "endFrame": 128,
        "startSec": 2.9,
        "endSec": 6.4,
        "actionText": "Place the white mug on the plate",
        "skill": "place"
      },
      {
        "startFrame": 128,
        "endFrame": 178,
        "startSec": 6.4,
        "endSec": 8.9,
        "actionText": "Pick up the chocolate pudding using the right hand",
        "skill": "pick"
      },
      {
        "startFrame": 178,
        "endFrame": 208,
        "startSec": 8.9,
        "endSec": 10.4,
        "actionText": "Place the chocolate pudding to the right of the plate",
        "skill": "place"
      }
    ]
  },
  "libero_long_009": {
    "id": "libero_long_009",
    "taskId": 9,
    "episodeId": "demo_49",
    "taskName": "STUDY SCENE1 pick up the book and place it in the back compartment of the caddy",
    "duration": 9.2,
    "frameCount": 184,
    "sourceFps": 20.0,
    "samplingFps": 8.0,
    "latencySec": 20.666,
    "success": true,
    "observedSummary": "The robot arm approaches the black book on the table from above, grasps it, lifts it, and moves it to the left to place it into the back-left compartment of the brown caddy.",
    "actions": [
      {
        "startFrame": 0,
        "endFrame": 95,
        "startSec": 0.0,
        "endSec": 4.75,
        "actionText": "Pick up the black book using the right hand",
        "skill": "pick"
      },
      {
        "startFrame": 95,
        "endFrame": 184,
        "startSec": 4.75,
        "endSec": 9.2,
        "actionText": "Place the black book in the back compartment of the caddy",
        "skill": "place"
      }
    ]
  }
}
;
