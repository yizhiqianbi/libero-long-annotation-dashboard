export type TemporalSpan = { start: number; end: number };
export type Segment = { action: string; start_sec: number; end_sec: number };
export type ModelResult = { latency: number; answer: string; spans: TemporalSpan[] };
export type VideoRecord = { id: string; task: string; scenario: string; duration: number; successGt: boolean; src: string; episodeId: string; qwen: { success: boolean; caption: string; reason: string | null; latency: number; segments: Segment[] }; timelens2: ModelResult; timelens: ModelResult };

export const videoRecords: VideoRecord[] = [
  {
    "id": "libero_long_000",
    "task": "KITCHEN SCENE3 turn on the stove and put the moka pot on it",
    "scenario": "agentview_rgb",
    "duration": 13.6,
    "successGt": true,
    "src": "/videos/libero_long_000.mp4",
    "episodeId": "demo_49",
    "qwen": {
      "success": false,
      "caption": "The robot arm moves to the right to press the stove knob, turning on the burner, and then moves to the left to grasp the moka pot.",
      "reason": "The robot only grasps the moka pot but does not place it on the stove before the video ends.",
      "latency": 12.778,
      "segments": [
        {
          "action": "Robot arm moves right and presses the stove knob to turn on the burner",
          "start_sec": 0.0,
          "end_sec": 6.0
        },
        {
          "action": "Robot arm moves left and grasps the moka pot",
          "start_sec": 6.0,
          "end_sec": 13.5
        }
      ]
    },
    "timelens2": {
      "latency": 1.346,
      "answer": "[[2.0, 13.0]]",
      "spans": [
        {
          "start": 2.0,
          "end": 13.0
        }
      ]
    },
    "timelens": {
      "latency": 1.445,
      "answer": "The event happens in 2.0 - 13.0 seconds.",
      "spans": [
        {
          "start": 2.0,
          "end": 13.0
        }
      ]
    }
  },
  {
    "id": "libero_long_001",
    "task": "KITCHEN SCENE4 put the black bowl in the bottom drawer of the cabinet and close it",
    "scenario": "agentview_rgb",
    "duration": 12.6,
    "successGt": true,
    "src": "/videos/libero_long_001.mp4",
    "episodeId": "demo_49",
    "qwen": {
      "success": true,
      "caption": "The robot arm approaches a silver clock on the table, grasps it, and places it into an open drawer on the right. The arm then pushes the drawer closed.",
      "reason": null,
      "latency": 15.423,
      "segments": [
        {
          "action": "Move arm towards the clock and grasp it",
          "start_sec": 0.0,
          "end_sec": 4.0
        },
        {
          "action": "Lift the clock and move it to the open drawer",
          "start_sec": 4.0,
          "end_sec": 7.0
        },
        {
          "action": "Place the clock inside the drawer and release it",
          "start_sec": 7.0,
          "end_sec": 10.0
        },
        {
          "action": "Push the drawer closed",
          "start_sec": 10.0,
          "end_sec": 12.6
        }
      ]
    },
    "timelens2": {
      "latency": 0.773,
      "answer": "[[0.0, 12.0]]",
      "spans": [
        {
          "start": 0.0,
          "end": 12.0
        }
      ]
    },
    "timelens": {
      "latency": 0.988,
      "answer": "The event happens in 6.0 - 10.0 seconds.",
      "spans": [
        {
          "start": 6.0,
          "end": 10.0
        }
      ]
    }
  },
  {
    "id": "libero_long_002",
    "task": "KITCHEN SCENE6 put the yellow and white mug in the microwave and close it",
    "scenario": "agentview_rgb",
    "duration": 14.75,
    "successGt": true,
    "src": "/videos/libero_long_002.mp4",
    "episodeId": "demo_49",
    "qwen": {
      "success": true,
      "caption": "The robot arm grasps the yellow and white mug from the table, lifts it, and places it inside the open microwave. The arm then retracts and pushes the microwave door shut.",
      "reason": null,
      "latency": 12.88,
      "segments": [
        {
          "action": "Grasp the yellow and white mug",
          "start_sec": 0.0,
          "end_sec": 4.0
        },
        {
          "action": "Lift and move the mug into the microwave",
          "start_sec": 4.0,
          "end_sec": 9.0
        },
        {
          "action": "Retract arm and close the microwave door",
          "start_sec": 9.0,
          "end_sec": 14.0
        }
      ]
    },
    "timelens2": {
      "latency": 1.031,
      "answer": "[[2.0, 14.0]]",
      "spans": [
        {
          "start": 2.0,
          "end": 14.0
        }
      ]
    },
    "timelens": {
      "latency": 1.225,
      "answer": "The event happens in 6.0 - 14.0 seconds.",
      "spans": [
        {
          "start": 6.0,
          "end": 14.0
        }
      ]
    }
  },
  {
    "id": "libero_long_003",
    "task": "KITCHEN SCENE8 put both moka pots on the stove",
    "scenario": "agentview_rgb",
    "duration": 17.55,
    "successGt": true,
    "src": "/videos/libero_long_003.mp4",
    "episodeId": "demo_49",
    "qwen": {
      "success": true,
      "caption": "The robot arm moves upward to grasp the left wall-mounted spotlight, rotates it to face downwards, and releases it. The arm then moves to the right to grasp the second spotlight, rotates it to face downwards, and releases it.",
      "reason": null,
      "latency": 17.263,
      "segments": [
        {
          "action": "Move arm up and left to approach the left spotlight, then grasp it.",
          "start_sec": 0.0,
          "end_sec": 4.0
        },
        {
          "action": "Rotate the left spotlight to point downwards and release the grip.",
          "start_sec": 4.0,
          "end_sec": 9.0
        },
        {
          "action": "Move arm to the right to approach the right spotlight, then grasp it.",
          "start_sec": 9.0,
          "end_sec": 13.0
        },
        {
          "action": "Rotate the right spotlight to point downwards and release the grip.",
          "start_sec": 13.0,
          "end_sec": 17.0
        }
      ]
    },
    "timelens2": {
      "latency": 1.0,
      "answer": "[[0.0, 17.0]]",
      "spans": [
        {
          "start": 0.0,
          "end": 17.0
        }
      ]
    },
    "timelens": {
      "latency": 0.77,
      "answer": "The event happens in 13.0 - 16.0 seconds.",
      "spans": [
        {
          "start": 13.0,
          "end": 16.0
        }
      ]
    }
  },
  {
    "id": "libero_long_004",
    "task": "LIVING ROOM SCENE1 put both the alphabet soup and the cream cheese box in the basket",
    "scenario": "agentview_rgb",
    "duration": 14.6,
    "successGt": true,
    "src": "/videos/libero_long_004.mp4",
    "episodeId": "demo_49",
    "qwen": {
      "success": true,
      "caption": "The robot arm grasps the blue can (alphabet soup) from the table and places it into the basket on the right. The arm then returns to the center, grasps the small blue box (cream cheese), and places it into the basket next to the can.",
      "reason": null,
      "latency": 17.893,
      "segments": [
        {
          "action": "Grasp the blue can on the table",
          "start_sec": 0.0,
          "end_sec": 3.0
        },
        {
          "action": "Move the blue can to the right and place it into the basket",
          "start_sec": 3.0,
          "end_sec": 8.0
        },
        {
          "action": "Return to the center and grasp the small blue box",
          "start_sec": 8.0,
          "end_sec": 11.0
        },
        {
          "action": "Move the blue box to the right and place it into the basket",
          "start_sec": 11.0,
          "end_sec": 14.0
        }
      ]
    },
    "timelens2": {
      "latency": 0.826,
      "answer": "[[4.0, 14.0]]",
      "spans": [
        {
          "start": 4.0,
          "end": 14.0
        }
      ]
    },
    "timelens": {
      "latency": 0.972,
      "answer": "The event happens in 1.0 - 14.0 seconds.",
      "spans": [
        {
          "start": 1.0,
          "end": 14.0
        }
      ]
    }
  },
  {
    "id": "libero_long_005",
    "task": "LIVING ROOM SCENE2 put both the alphabet soup and the tomato sauce in the basket",
    "scenario": "agentview_rgb",
    "duration": 13.9,
    "successGt": true,
    "src": "/videos/libero_long_005.mp4",
    "episodeId": "demo_49",
    "qwen": {
      "success": true,
      "caption": "The robot arm sequentially picks up the alphabet soup can and the tomato sauce can from the table and places them into the basket on the right.",
      "reason": null,
      "latency": 16.553,
      "segments": [
        {
          "action": "Move to the alphabet soup can, grasp it, and lift it off the table.",
          "start_sec": 0.0,
          "end_sec": 5.0
        },
        {
          "action": "Move the alphabet soup can to the basket and release it inside.",
          "start_sec": 5.0,
          "end_sec": 8.0
        },
        {
          "action": "Move to the tomato sauce can, grasp it, and lift it off the table.",
          "start_sec": 8.0,
          "end_sec": 11.0
        },
        {
          "action": "Move the tomato sauce can to the basket and release it inside.",
          "start_sec": 11.0,
          "end_sec": 14.0
        }
      ]
    },
    "timelens2": {
      "latency": 0.919,
      "answer": "[[4.0, 13.0]]",
      "spans": [
        {
          "start": 4.0,
          "end": 13.0
        }
      ]
    },
    "timelens": {
      "latency": 0.946,
      "answer": "The event happens in 5.0 - 13.0 seconds.",
      "spans": [
        {
          "start": 5.0,
          "end": 13.0
        }
      ]
    }
  },
  {
    "id": "libero_long_006",
    "task": "LIVING ROOM SCENE2 put both the cream cheese box and the butter in the basket",
    "scenario": "agentview_rgb",
    "duration": 12.7,
    "successGt": true,
    "src": "/videos/libero_long_006.mp4",
    "episodeId": "demo_49",
    "qwen": {
      "success": true,
      "caption": "The robot arm first grasps the blue box on the left side of the table and moves it to the basket on the right. Next, the arm grasps the orange box located in the center of the table and moves it to the basket, placing it inside.",
      "reason": null,
      "latency": 12.257,
      "segments": [
        {
          "action": "Grasp the blue box on the left and move it to the basket on the right",
          "start_sec": 0.0,
          "end_sec": 5.0
        },
        {
          "action": "Grasp the orange box in the center and move it to the basket",
          "start_sec": 5.0,
          "end_sec": 12.5
        }
      ]
    },
    "timelens2": {
      "latency": 1.004,
      "answer": "[[0.0, 12.0]]",
      "spans": [
        {
          "start": 0.0,
          "end": 12.0
        }
      ]
    },
    "timelens": {
      "latency": 0.967,
      "answer": "The event happens in 5.0 - 12.0 seconds.",
      "spans": [
        {
          "start": 5.0,
          "end": 12.0
        }
      ]
    }
  },
  {
    "id": "libero_long_007",
    "task": "LIVING ROOM SCENE5 put the white mug on the left plate and put the yellow and white mug on the right plate",
    "scenario": "agentview_rgb",
    "duration": 13.35,
    "successGt": true,
    "src": "/videos/libero_long_007.mp4",
    "episodeId": "demo_49",
    "qwen": {
      "success": true,
      "caption": "The robot arm first grasps the white mug on the left and moves it to the left plate. It then grasps the yellow and white mug on the right and moves it to the right plate.",
      "reason": null,
      "latency": 14.959,
      "segments": [
        {
          "action": "grasp white mug",
          "start_sec": 0.0,
          "end_sec": 5.0
        },
        {
          "action": "move white mug to left plate",
          "start_sec": 5.0,
          "end_sec": 9.0
        },
        {
          "action": "grasp yellow and white mug",
          "start_sec": 9.0,
          "end_sec": 11.0
        },
        {
          "action": "move yellow and white mug to right plate",
          "start_sec": 11.0,
          "end_sec": 13.3
        }
      ]
    },
    "timelens2": {
      "latency": 0.93,
      "answer": "[[5.0, 13.0]]",
      "spans": [
        {
          "start": 5.0,
          "end": 13.0
        }
      ]
    },
    "timelens": {
      "latency": 1.061,
      "answer": "The event happens in 5.0 - 13.0 seconds.",
      "spans": [
        {
          "start": 5.0,
          "end": 13.0
        }
      ]
    }
  },
  {
    "id": "libero_long_008",
    "task": "LIVING ROOM SCENE6 put the white mug on the plate and put the chocolate pudding to the right of the plate",
    "scenario": "agentview_rgb",
    "duration": 10.4,
    "successGt": true,
    "src": "/videos/libero_long_008.mp4",
    "episodeId": "demo_49",
    "qwen": {
      "success": false,
      "caption": "The robot arm grasps the white mug, lifts it, and places it onto the plate. The arm then retracts, leaving the mug on the plate and the chocolate pudding in its original position.",
      "reason": "The robot failed to move the chocolate pudding to the right of the plate.",
      "latency": 14.647,
      "segments": [
        {
          "action": "Grasp the white mug and lift it off the table",
          "start_sec": 0.0,
          "end_sec": 4.0
        },
        {
          "action": "Move the mug over the plate and release it to place it on the plate",
          "start_sec": 4.0,
          "end_sec": 7.0
        },
        {
          "action": "Retract the arm upwards and away from the workspace",
          "start_sec": 7.0,
          "end_sec": 10.0
        }
      ]
    },
    "timelens2": {
      "latency": 0.919,
      "answer": "[[3.0, 10.0]]",
      "spans": [
        {
          "start": 3.0,
          "end": 10.0
        }
      ]
    },
    "timelens": {
      "latency": 1.056,
      "answer": "The event happens in 3.0 - 9.0 seconds.",
      "spans": [
        {
          "start": 3.0,
          "end": 9.0
        }
      ]
    }
  },
  {
    "id": "libero_long_009",
    "task": "STUDY SCENE1 pick up the book and place it in the back compartment of the caddy",
    "scenario": "agentview_rgb",
    "duration": 9.2,
    "successGt": true,
    "src": "/videos/libero_long_009.mp4",
    "episodeId": "demo_49",
    "qwen": {
      "success": true,
      "caption": "The robot arm approaches the black book on the table from the right, grasps it, and lifts it. The arm then moves the book to the left and lowers it into the back compartment of the brown caddy, releasing it inside.",
      "reason": null,
      "latency": 14.138,
      "segments": [
        {
          "action": "Move arm towards the book and grasp it",
          "start_sec": 0.0,
          "end_sec": 4.0
        },
        {
          "action": "Lift the book and move it to the caddy",
          "start_sec": 4.0,
          "end_sec": 6.0
        },
        {
          "action": "Lower the book into the back compartment and release",
          "start_sec": 6.0,
          "end_sec": 9.0
        }
      ]
    },
    "timelens2": {
      "latency": 0.956,
      "answer": "[[3.0, 8.0]]",
      "spans": [
        {
          "start": 3.0,
          "end": 8.0
        }
      ]
    },
    "timelens": {
      "latency": 0.82,
      "answer": "The event happens in 3.0 - 8.0 seconds.",
      "spans": [
        {
          "start": 3.0,
          "end": 8.0
        }
      ]
    }
  }
];

