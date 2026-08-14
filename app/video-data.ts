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
      "success": true,
      "caption": "A robotic arm in a kitchen simulation first moves to the stove control knob, grasps it, and rotates it to turn on the burner (indicated by a red glow). The arm then retracts, moves to the moka pot on the counter, grasps it, lifts it, and places it onto the active burner.",
      "reason": null,
      "latency": 28.841,
      "segments": [
        {
          "action": "Move the robotic arm from the bottom center towards the stove knob on the right.",
          "start_sec": 0.0,
          "end_sec": 2.0
        },
        {
          "action": "Descend and close the gripper to grasp the stove knob.",
          "start_sec": 2.0,
          "end_sec": 3.5
        },
        {
          "action": "Rotate the knob to the right to turn on the stove, causing the burner to glow red.",
          "start_sec": 3.5,
          "end_sec": 6.0
        },
        {
          "action": "Open the gripper to release the knob and retract the arm to the left.",
          "start_sec": 6.0,
          "end_sec": 8.0
        },
        {
          "action": "Move the arm to the moka pot and close the gripper to grasp its handle.",
          "start_sec": 8.0,
          "end_sec": 10.0
        },
        {
          "action": "Lift the moka pot and transport it to the right, aligning it above the stove burner.",
          "start_sec": 10.0,
          "end_sec": 12.0
        },
        {
          "action": "Lower the moka pot onto the burner and open the gripper to release it.",
          "start_sec": 12.0,
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
      "caption": "A robotic arm grasps a black bowl from a wooden table, transports it to an open cabinet drawer, places the bowl inside, and retracts.",
      "reason": null,
      "latency": 21.223,
      "segments": [
        {
          "action": "Move the robotic arm from the bottom center towards the black bowl on the table to the left.",
          "start_sec": 0.0,
          "end_sec": 2.0
        },
        {
          "action": "Descend and close the gripper to grasp the black bowl.",
          "start_sec": 2.0,
          "end_sec": 4.0
        },
        {
          "action": "Lift the black bowl and transport it to the right towards the open cabinet.",
          "start_sec": 4.0,
          "end_sec": 7.0
        },
        {
          "action": "Lower the black bowl into the open cabinet drawer.",
          "start_sec": 7.0,
          "end_sec": 9.0
        },
        {
          "action": "Open the gripper to release the black bowl inside the drawer.",
          "start_sec": 9.0,
          "end_sec": 10.0
        },
        {
          "action": "Retract the robotic arm upwards and away from the cabinet.",
          "start_sec": 10.0,
          "end_sec": 12.5
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
      "caption": "A white robotic arm in a kitchen simulation reaches for a yellow and white mug on a wooden countertop, grasps it, transports it into an open black microwave, releases it, and closes the microwave door.",
      "reason": null,
      "latency": 25.316,
      "segments": [
        {
          "action": "Move the robotic arm from the bottom center towards the yellow and white mug on the counter.",
          "start_sec": 0.0,
          "end_sec": 2.5
        },
        {
          "action": "Align the open gripper directly above the yellow and white mug.",
          "start_sec": 2.5,
          "end_sec": 3.5
        },
        {
          "action": "Descend and close the gripper to grasp the mug by its handle.",
          "start_sec": 3.5,
          "end_sec": 5.0
        },
        {
          "action": "Lift the mug and transport it to the right towards the open microwave.",
          "start_sec": 5.0,
          "end_sec": 7.5
        },
        {
          "action": "Lower the mug into the microwave cavity and open the gripper to release it.",
          "start_sec": 7.5,
          "end_sec": 9.2
        },
        {
          "action": "Retract the arm from the microwave and move towards the open door.",
          "start_sec": 9.5,
          "end_sec": 11.5
        },
        {
          "action": "Push the microwave door closed with the arm.",
          "start_sec": 11.5,
          "end_sec": 14.5
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
      "caption": "A dual-arm robot in a kitchen scene uses its left arm to grasp a silver moka pot from the counter and place it on the left burner of the stove. The right arm then grasps a second moka pot from the counter and places it on the right burner.",
      "reason": null,
      "latency": 32.968,
      "segments": [
        {
          "action": "Left arm moves upward and forward to approach the first moka pot on the counter.",
          "start_sec": 0.0,
          "end_sec": 2.0
        },
        {
          "action": "Left arm descends and closes its gripper to grasp the first moka pot.",
          "start_sec": 2.0,
          "end_sec": 3.5
        },
        {
          "action": "Left arm lifts the first moka pot and transports it to the left side of the stove.",
          "start_sec": 3.5,
          "end_sec": 5.5
        },
        {
          "action": "Left arm lowers the first moka pot onto the left burner and releases it.",
          "start_sec": 5.5,
          "end_sec": 7.5
        },
        {
          "action": "Left arm retracts, and the right arm moves forward to approach the second moka pot.",
          "start_sec": 7.5,
          "end_sec": 9.5
        },
        {
          "action": "Right arm descends and closes its gripper to grasp the second moka pot.",
          "start_sec": 9.5,
          "end_sec": 11.0
        },
        {
          "action": "Right arm lifts the second moka pot and transports it to the right side of the stove.",
          "start_sec": 11.0,
          "end_sec": 13.5
        },
        {
          "action": "Right arm lowers the second moka pot onto the right burner and releases it.",
          "start_sec": 13.5,
          "end_sec": 15.5
        },
        {
          "action": "Right arm retracts upward and away from the stove.",
          "start_sec": 15.5,
          "end_sec": 17.5
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
      "caption": "A robotic arm sequentially grasps a blue can and a small blue box from a wooden table and places them into a white basket on the right.",
      "reason": null,
      "latency": 27.509,
      "segments": [
        {
          "action": "Move the open gripper from the bottom center towards the blue can on the left.",
          "start_sec": 0.0,
          "end_sec": 1.5
        },
        {
          "action": "Descend and close the gripper to grasp the blue can.",
          "start_sec": 1.5,
          "end_sec": 3.0
        },
        {
          "action": "Lift the blue can and transport it to the right towards the basket.",
          "start_sec": 3.0,
          "end_sec": 5.0
        },
        {
          "action": "Lower the blue can into the basket and open the gripper to release it.",
          "start_sec": 5.0,
          "end_sec": 7.0
        },
        {
          "action": "Retract the arm and move towards the small blue box in the center.",
          "start_sec": 7.0,
          "end_sec": 9.0
        },
        {
          "action": "Descend and close the gripper to grasp the small blue box.",
          "start_sec": 9.0,
          "end_sec": 10.5
        },
        {
          "action": "Lift the blue box and transport it to the right towards the basket.",
          "start_sec": 10.5,
          "end_sec": 12.5
        },
        {
          "action": "Lower the blue box into the basket and open the gripper to release it.",
          "start_sec": 12.5,
          "end_sec": 14.5
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
      "caption": "A robotic arm in a living room scene sequentially picks up a blue box (alphabet soup) and a green box (tomato sauce) from a wooden table and places them into a white basket on the right.",
      "reason": null,
      "latency": 28.258,
      "segments": [
        {
          "action": "Move the arm from the bottom center toward the blue box on the left side of the table.",
          "start_sec": 0.0,
          "end_sec": 1.5
        },
        {
          "action": "Descend and close the gripper to grasp the blue box.",
          "start_sec": 1.5,
          "end_sec": 3.0
        },
        {
          "action": "Lift the blue box and transport it to the right toward the basket.",
          "start_sec": 3.0,
          "end_sec": 5.5
        },
        {
          "action": "Lower the blue box into the basket and open the gripper to release it.",
          "start_sec": 5.5,
          "end_sec": 7.5
        },
        {
          "action": "Retract the arm and move left to approach the green box.",
          "start_sec": 7.5,
          "end_sec": 9.0
        },
        {
          "action": "Descend and close the gripper to grasp the green box.",
          "start_sec": 9.0,
          "end_sec": 10.5
        },
        {
          "action": "Lift the green box and transport it to the right toward the basket.",
          "start_sec": 10.5,
          "end_sec": 12.5
        },
        {
          "action": "Lower the green box into the basket and open the gripper to release it.",
          "start_sec": 12.5,
          "end_sec": 13.9
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
      "caption": "A robotic arm in a living room scene sequentially picks up a blue box (cream cheese) and an orange box (butter) from a wooden table and places them into a wicker basket on the right.",
      "reason": null,
      "latency": 28.185,
      "segments": [
        {
          "action": "Move the arm from the bottom center toward the blue box on the left side of the table.",
          "start_sec": 0.0,
          "end_sec": 1.5
        },
        {
          "action": "Descend and close the gripper to grasp the blue box.",
          "start_sec": 1.5,
          "end_sec": 3.0
        },
        {
          "action": "Lift the blue box and transport it to the right toward the basket.",
          "start_sec": 3.0,
          "end_sec": 5.5
        },
        {
          "action": "Lower the blue box into the basket and open the gripper to release it.",
          "start_sec": 5.5,
          "end_sec": 7.0
        },
        {
          "action": "Retract the arm and move left to approach the orange box.",
          "start_sec": 7.0,
          "end_sec": 8.5
        },
        {
          "action": "Descend and close the gripper to grasp the orange box.",
          "start_sec": 8.5,
          "end_sec": 10.0
        },
        {
          "action": "Lift the orange box and transport it to the right toward the basket.",
          "start_sec": 10.0,
          "end_sec": 11.5
        },
        {
          "action": "Lower the orange box into the basket and open the gripper to release it.",
          "start_sec": 11.5,
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
      "caption": "A dual-arm robot manipulates two mugs on a wooden table. The left arm grasps a white mug and moves it to the left plate. The right arm then grasps a yellow and white mug and moves it to the right plate.",
      "reason": null,
      "latency": 27.941,
      "segments": [
        {
          "action": "Left arm approaches the white mug from the left and closes its gripper to grasp the handle.",
          "start_sec": 0.0,
          "end_sec": 2.5
        },
        {
          "action": "Left arm lifts the white mug and transports it to the left side of the table.",
          "start_sec": 2.5,
          "end_sec": 5.0
        },
        {
          "action": "Left arm lowers the white mug onto the left plate and opens the gripper to release it.",
          "start_sec": 5.0,
          "end_sec": 7.0
        },
        {
          "action": "Left arm retracts away from the plate while the right arm moves into position to approach the yellow and white mug.",
          "start_sec": 7.0,
          "end_sec": 9.0
        },
        {
          "action": "Right arm closes its gripper to grasp the handle of the yellow and white mug.",
          "start_sec": 9.0,
          "end_sec": 10.5
        },
        {
          "action": "Right arm lifts the yellow and white mug and transports it to the right side of the table.",
          "start_sec": 10.5,
          "end_sec": 12.0
        },
        {
          "action": "Right arm lowers the yellow and white mug onto the right plate and opens the gripper to release it.",
          "start_sec": 12.0,
          "end_sec": 13.0
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
      "success": true,
      "caption": "A robotic arm grasps a white mug from the left, lifts it, and places it onto a plate. The arm then retracts and moves to grasp a small brown box (chocolate pudding) from the right, lifting it slightly.",
      "reason": null,
      "latency": 24.85,
      "segments": [
        {
          "action": "Move the open gripper towards the white mug on the left and align above it.",
          "start_sec": 0.0,
          "end_sec": 2.0
        },
        {
          "action": "Descend and close the gripper to grasp the white mug.",
          "start_sec": 2.0,
          "end_sec": 3.5
        },
        {
          "action": "Lift the white mug and transport it towards the plate.",
          "start_sec": 3.5,
          "end_sec": 5.0
        },
        {
          "action": "Align the mug over the plate and lower it.",
          "start_sec": 5.0,
          "end_sec": 6.5
        },
        {
          "action": "Release the mug onto the plate and retract the arm upwards.",
          "start_sec": 6.5,
          "end_sec": 8.0
        },
        {
          "action": "Move the arm towards the brown box on the right and align above it.",
          "start_sec": 8.0,
          "end_sec": 9.0
        },
        {
          "action": "Descend and close the gripper to grasp the brown box.",
          "start_sec": 9.0,
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
      "caption": "A robotic arm approaches a black book on a wooden table, grasps it, lifts it, and moves it to the left to place it into the back compartment of a brown caddy.",
      "reason": null,
      "latency": 24.302,
      "segments": [
        {
          "action": "Move the arm from the bottom right towards the black book on the table.",
          "start_sec": 0.0,
          "end_sec": 2.0
        },
        {
          "action": "Align the gripper directly above the book and descend to make contact.",
          "start_sec": 2.0,
          "end_sec": 3.5
        },
        {
          "action": "Close the gripper to grasp the book.",
          "start_sec": 3.5,
          "end_sec": 4.5
        },
        {
          "action": "Lift the book vertically off the table surface.",
          "start_sec": 4.5,
          "end_sec": 5.5
        },
        {
          "action": "Transport the book to the left, positioning it over the back compartment of the caddy.",
          "start_sec": 5.5,
          "end_sec": 7.0
        },
        {
          "action": "Lower the book into the compartment and open the gripper to release it.",
          "start_sec": 7.0,
          "end_sec": 8.5
        },
        {
          "action": "Retract the arm upwards and away from the caddy.",
          "start_sec": 8.5,
          "end_sec": 9.2
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
