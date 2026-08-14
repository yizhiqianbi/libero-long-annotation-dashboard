 export type VideoRecord = {
   id: string; task: string; scenario: string; duration: number; success: boolean; eligible: boolean; src: string; caption: string; reason: string | null; segments: Array<{ action: string; start_sec: number; end_sec: number }>;
 };
 
 export const videoRecords: VideoRecord[] = [
   {
     "id": "libero_plus_000",
     "task": "open the middle drawer of the cabinet",
     "scenario": "cam",
     "duration": 10.0,
     "success": true,
     "eligible": true,
     "src": "/videos/libero_plus_000.mp4",
     "caption": "The robot arm moves from the top center towards the cabinet on the right, grasps the handle of the middle drawer, and pulls it open.",
     "reason": null,
     "segments": [
       {
         "action": "Move arm towards the middle drawer handle and grasp it",
         "start_sec": 0.0,
         "end_sec": 3.0
       },
       {
         "action": "Pull the drawer handle to open the drawer",
         "start_sec": 3.0,
         "end_sec": 4.5
       },
       {
         "action": "Retract arm and hold position",
         "start_sec": 4.5,
         "end_sec": 9.8
       }
     ]
   },
   {
     "id": "libero_plus_001",
     "task": "pick up the alphabet soup and place it in the basket",
     "scenario": "cam",
     "duration": 9.334,
     "success": true,
     "eligible": true,
     "src": "/videos/libero_plus_001.mp4",
     "caption": "The robot arm moves from the top center to the left, grasps the blue can on the floor, and lifts it. It then moves the can to the left and places it into the white basket.",
     "reason": null,
     "segments": [
       {
         "action": "Move arm to the left and lower the gripper to grasp the blue can.",
         "start_sec": 0.0,
         "end_sec": 4.0
       },
       {
         "action": "Lift the can and move it left towards the basket.",
         "start_sec": 4.0,
         "end_sec": 6.0
       },
       {
         "action": "Lower the can into the basket and release the gripper.",
         "start_sec": 6.0,
         "end_sec": 8.0
       }
     ]
   },
   {
     "id": "libero_plus_002",
     "task": "pick up the black bowl between the plate and the ramekin and place it on the plate",
     "scenario": "cam",
     "duration": 7.334,
     "success": true,
     "eligible": true,
     "src": "/videos/libero_plus_002.mp4",
     "caption": "The robot arm moves from the left towards the black bowl located between the plate and the ramekin. It grasps the bowl, lifts it, and places it onto the plate.",
     "reason": null,
     "segments": [
       {
         "action": "Move arm towards the black bowl and grasp it",
         "start_sec": 0.0,
         "end_sec": 3.0
       },
       {
         "action": "Lift the bowl and move it over the plate",
         "start_sec": 3.0,
         "end_sec": 5.0
       },
       {
         "action": "Place the bowl on the plate and release",
         "start_sec": 5.0,
         "end_sec": 7.0
       }
     ]
   },
   {
     "id": "libero_plus_003",
     "task": "pick up the alphabet soup and place it in the basket",
     "scenario": "cam",
     "duration": 9.334,
     "success": false,
     "eligible": true,
     "src": "/videos/libero_plus_003.mp4",
     "caption": "The robot arm moves from the left towards the red can on the right side of the table. It approaches the can from above, closes its gripper to grasp it, and then holds the can in a suspended position without placing it in the basket.",
     "reason": "The robot grasps the can but fails to place it into the basket, leaving the object suspended in the air.",
     "segments": [
       {
         "action": "Move arm towards the red can and position gripper above it",
         "start_sec": 0.0,
         "end_sec": 3.0
       },
       {
         "action": "Close gripper to grasp the red can",
         "start_sec": 3.0,
         "end_sec": 4.5
       },
       {
         "action": "Hold the red can in a stationary position",
         "start_sec": 4.5,
         "end_sec": 9.2
       }
     ]
   },
   {
     "id": "libero_plus_004",
     "task": "pick up the alphabet soup and place it in the basket",
     "scenario": "env",
     "duration": 9.334,
     "success": true,
     "eligible": true,
     "src": "/videos/libero_plus_004.mp4",
     "caption": "The robot arm moves from the top center to the right, grasps the blue can (alphabet soup) from above, lifts it, and places it into the basket on the left side of the table.",
     "reason": null,
     "segments": [
       {
         "action": "Move arm to the right and descend to grasp the blue can from above.",
         "start_sec": 0.0,
         "end_sec": 2.5
       },
       {
         "action": "Lift the blue can and move it to the left towards the basket.",
         "start_sec": 2.5,
         "end_sec": 4.0
       },
       {
         "action": "Lower the can into the basket and open the gripper to release it.",
         "start_sec": 4.0,
         "end_sec": 5.5
       },
       {
         "action": "Retract the arm upwards and to the right, away from the basket.",
         "start_sec": 5.5,
         "end_sec": 9.0
       }
     ]
   },
   {
     "id": "libero_plus_005",
     "task": "pick up the black bowl between the plate and the ramekin and place it on the plate",
     "scenario": "env",
     "duration": 7.334,
     "success": true,
     "eligible": true,
     "src": "/videos/libero_plus_005.mp4",
     "caption": "The robot arm moves from the top center to the left, approaching the black bowl located between the plate and the ramekin. It grasps the bowl, lifts it, and moves it to the left to place it onto the plate.",
     "reason": null,
     "segments": [
       {
         "action": "Move arm down and left to approach the black bowl from above",
         "start_sec": 0.0,
         "end_sec": 2.0
       },
       {
         "action": "Grasp the black bowl",
         "start_sec": 2.0,
         "end_sec": 3.0
       },
       {
         "action": "Lift the bowl and move it left to position over the plate",
         "start_sec": 3.0,
         "end_sec": 4.5
       },
       {
         "action": "Lower the bowl onto the plate and release the grasp",
         "start_sec": 4.5,
         "end_sec": 6.0
       },
       {
         "action": "Retract arm slightly upwards",
         "start_sec": 6.0,
         "end_sec": 7.0
       }
     ]
   },
   {
     "id": "libero_plus_006",
     "task": "pick up the salad dressing and place it in the basket",
     "scenario": "env",
     "duration": 9.334,
     "success": true,
     "eligible": true,
     "src": "/videos/libero_plus_006.mp4",
     "caption": "The robot arm approaches the blue rectangular object (salad dressing) on the table from above, grasps it, lifts it, and moves it to the left to place it into the woven basket.",
     "reason": null,
     "segments": [
       {
         "action": "Move arm down and right to approach the blue object on the table from above.",
         "start_sec": 0.0,
         "end_sec": 2.5
       },
       {
         "action": "Close gripper to grasp the blue object.",
         "start_sec": 2.5,
         "end_sec": 3.5
       },
       {
         "action": "Lift the object and move it left towards the basket.",
         "start_sec": 3.5,
         "end_sec": 6.0
       },
       {
         "action": "Lower the object into the basket and open the gripper to release it.",
         "start_sec": 6.0,
         "end_sec": 8.5
       },
       {
         "action": "Retract arm upwards and away from the basket.",
         "start_sec": 8.5,
         "end_sec": 9.5
       }
     ]
   },
   {
     "id": "libero_plus_007",
     "task": "open the middle drawer of the cabinet",
     "scenario": "env",
     "duration": 10.0,
     "success": true,
     "eligible": true,
     "src": "/videos/libero_plus_007.mp4",
     "caption": "The robot arm moves from the top center towards the cabinet on the right. It approaches the middle drawer handle, grasps it, and pulls it outward to open the drawer. The arm then retracts slightly while the drawer remains open.",
     "reason": null,
     "segments": [
       {
         "action": "Move arm towards the middle drawer handle of the cabinet",
         "start_sec": 0.0,
         "end_sec": 2.5
       },
       {
         "action": "Grasp the drawer handle and pull it open",
         "start_sec": 2.5,
         "end_sec": 6.0
       },
       {
         "action": "Retract arm away from the open drawer",
         "start_sec": 6.0,
         "end_sec": 9.8
       }
     ]
   },
   {
     "id": "libero_plus_008",
     "task": "open the middle drawer of the cabinet",
     "scenario": "init",
     "duration": 10.0,
     "success": true,
     "eligible": true,
     "src": "/videos/libero_plus_008.mp4",
     "caption": "The robot arm moves from the top center towards the middle drawer of the cabinet on the right. It approaches the drawer handle, grasps it, and pulls it outward to open the drawer.",
     "reason": null,
     "segments": [
       {
         "action": "Move arm towards the middle drawer handle and grasp it",
         "start_sec": 0.0,
         "end_sec": 4.0
       },
       {
         "action": "Pull the drawer handle to open the drawer",
         "start_sec": 4.0,
         "end_sec": 9.0
       }
     ]
   },
   {
     "id": "libero_plus_009",
     "task": "pick up the chocolate pudding and place it in the basket",
     "scenario": "init",
     "duration": 9.334,
     "success": true,
     "eligible": true,
     "src": "/videos/libero_plus_009.mp4",
     "caption": "The robot arm approaches the blue can from above, grasps it, lifts it, and moves it to the left to place it into the white basket.",
     "reason": null,
     "segments": [
       {
         "action": "Move arm down and left to approach the blue can from above",
         "start_sec": 0.0,
         "end_sec": 1.5
       },
       {
         "action": "Grasp the blue can",
         "start_sec": 1.5,
         "end_sec": 2.0
       },
       {
         "action": "Lift the can and move it left towards the basket",
         "start_sec": 2.0,
         "end_sec": 3.5
       },
       {
         "action": "Lower the can into the basket and release it",
         "start_sec": 3.5,
         "end_sec": 5.0
       },
       {
         "action": "Retract arm upwards and away from the basket",
         "start_sec": 5.0,
         "end_sec": 8.0
       }
     ]
   },
   {
     "id": "libero_plus_010",
     "task": "pick up the black bowl on the ramekin and place it on the plate",
     "scenario": "init",
     "duration": 7.334,
     "success": true,
     "eligible": true,
     "src": "/videos/libero_plus_010.mp4",
     "caption": "The robot arm approaches the black bowl resting on the small wooden stand from above, grasps it, lifts it, and moves it to the left to place it onto the pink-rimmed plate.",
     "reason": null,
     "segments": [
       {
         "action": "Move arm down and left to approach the black bowl on the stand from above",
         "start_sec": 0.0,
         "end_sec": 2.5
       },
       {
         "action": "Grasp the black bowl with the gripper",
         "start_sec": 2.5,
         "end_sec": 3.5
       },
       {
         "action": "Lift the bowl and move it to the left towards the plate",
         "start_sec": 3.5,
         "end_sec": 5.5
       },
       {
         "action": "Lower the bowl onto the plate and open the gripper to release it",
         "start_sec": 5.5,
         "end_sec": 7.5
       }
     ]
   },
   {
     "id": "libero_plus_011",
     "task": "pick up the black bowl between the plate and the ramekin and place it on the plate",
     "scenario": "init",
     "duration": 7.334,
     "success": true,
     "eligible": true,
     "src": "/videos/libero_plus_011.mp4",
     "caption": "The robot arm moves from the top center to the left, grasps the black bowl located between the plate and the other bowl, lifts it, and places it onto the plate.",
     "reason": null,
     "segments": [
       {
         "action": "Move arm towards the black bowl and grasp it",
         "start_sec": 0.0,
         "end_sec": 3.5
       },
       {
         "action": "Lift the bowl and move it to the left over the plate",
         "start_sec": 3.5,
         "end_sec": 5.5
       },
       {
         "action": "Lower the bowl onto the plate and release the gripper",
         "start_sec": 5.5,
         "end_sec": 7.0
       }
     ]
   },
   {
     "id": "libero_plus_012",
     "task": "place both the rectangular package containing a sp",
     "scenario": "language",
     "duration": 17.334,
     "success": true,
     "eligible": false,
     "src": "/videos/libero_plus_012.mp4",
     "caption": "The robot arm sequentially picks up a blue cup and a green can from the table and places them into the white basket on the left. After placing the second object, the arm retracts and hovers above the table.",
     "reason": null,
     "segments": [
       {
         "action": "Move to the blue cup, grasp it, and place it into the white basket.",
         "start_sec": 0.0,
         "end_sec": 7.0
       },
       {
         "action": "Move to the green can, grasp it, and place it into the white basket.",
         "start_sec": 7.0,
         "end_sec": 12.0
       },
       {
         "action": "Retract the arm and hover above the table.",
         "start_sec": 12.0,
         "end_sec": 17.0
       }
     ]
   },
   {
     "id": "libero_plus_013",
     "task": "pick up the darkcolored vessel resting on the cont",
     "scenario": "language",
     "duration": 7.334,
     "success": true,
     "eligible": false,
     "src": "/videos/libero_plus_013.mp4",
     "caption": "The robot arm approaches the dark-colored vessel resting on the small stand from above. It grasps the vessel, lifts it, and moves it to the left to place it inside the pink-rimmed plate on the table. The arm then retracts upwards and to the left.",
     "reason": null,
     "segments": [
       {
         "action": "Move arm down and forward to approach the dark vessel on the stand from above.",
         "start_sec": 0.0,
         "end_sec": 1.5
       },
       {
         "action": "Grasp the dark vessel and lift it off the stand.",
         "start_sec": 1.5,
         "end_sec": 2.5
       },
       {
         "action": "Move the vessel to the left and lower it into the pink-rimmed plate.",
         "start_sec": 2.5,
         "end_sec": 3.5
       },
       {
         "action": "Release the vessel and retract the arm upwards and to the left.",
         "start_sec": 3.5,
         "end_sec": 7.0
       }
     ]
   },
   {
     "id": "libero_plus_014",
     "task": "pick up the darkcolored rounded dish next to the f",
     "scenario": "language",
     "duration": 7.334,
     "success": true,
     "eligible": false,
     "src": "/videos/libero_plus_014.mp4",
     "caption": "The robot arm moves from its home position to the left, approaching the dark-colored rounded dish on the table. It lowers its open gripper to grasp the dish from above, lifts it, and moves it to the right to place it on top of the white plate with a red rim.",
     "reason": null,
     "segments": [
       {
         "action": "Move arm towards the dark-colored dish and lower the gripper to grasp it",
         "start_sec": 0.0,
         "end_sec": 4.0
       },
       {
         "action": "Lift the dish and move it to the right over the white plate",
         "start_sec": 4.0,
         "end_sec": 5.5
       },
       {
         "action": "Lower the dish onto the white plate and release the grasp",
         "start_sec": 5.5,
         "end_sec": 7.0
       }
     ]
   },
   {
     "id": "libero_plus_015",
     "task": "grasp the darkhued mixing vessel residing on the s",
     "scenario": "language",
     "duration": 7.334,
     "success": true,
     "eligible": false,
     "src": "/videos/libero_plus_015.mp4",
     "caption": "The robot arm grasps a dark bowl from the stove, lifts it, and moves it to the left to place it onto a white plate on the table.",
     "reason": null,
     "segments": [
       {
         "action": "Grasp the dark bowl on the stove and lift it upward",
         "start_sec": 0.0,
         "end_sec": 2.0
       },
       {
         "action": "Move the bowl to the left and lower it onto the white plate",
         "start_sec": 2.0,
         "end_sec": 5.0
       },
       {
         "action": "Release the bowl and retract the arm",
         "start_sec": 5.0,
         "end_sec": 7.0
       }
     ]
   },
   {
     "id": "libero_plus_016",
     "task": "put the yellow and white mug in the microwave and close it",
     "scenario": "light",
     "duration": 17.334,
     "success": true,
     "eligible": true,
     "src": "/videos/libero_plus_016.mp4",
     "caption": "The robot arm grasps the yellow and white mug from the table, lifts it, and places it inside the open microwave. The arm then pushes the microwave door shut.",
     "reason": null,
     "segments": [
       {
         "action": "Grasp the yellow and white mug on the table",
         "start_sec": 0.0,
         "end_sec": 4.0
       },
       {
         "action": "Lift the mug and move it into the open microwave",
         "start_sec": 4.0,
         "end_sec": 9.0
       },
       {
         "action": "Release the mug inside the microwave",
         "start_sec": 9.0,
         "end_sec": 10.0
       },
       {
         "action": "Push the microwave door closed",
         "start_sec": 10.0,
         "end_sec": 17.0
       }
     ]
   },
   {
     "id": "libero_plus_017",
     "task": "put both moka pots on the stove",
     "scenario": "light",
     "duration": 17.334,
     "success": true,
     "eligible": true,
     "src": "/videos/libero_plus_017.mp4",
     "caption": "The robot arm sequentially picks up two moka pots from the table and places them onto the stove. The first pot is placed on the right side of the stove, and the second pot is placed on the left side, next to the first one.",
     "reason": null,
     "segments": [
       {
         "action": "Move arm down to grasp the right moka pot by its handle, lift it, and place it on the right side of the stove.",
         "start_sec": 0.0,
         "end_sec": 7.5
       },
       {
         "action": "Move arm to the left moka pot, grasp it by its handle, lift it, and place it on the left side of the stove next to the first pot.",
         "start_sec": 7.5,
         "end_sec": 17.0
       }
     ]
   },
   {
     "id": "libero_plus_018",
     "task": "put the black bowl in the bottom drawer of the cabinet",
     "scenario": "light",
     "duration": 17.334,
     "success": true,
     "eligible": true,
     "src": "/videos/libero_plus_018.mp4",
     "caption": "The robot arm approaches the black bowl on the table from above, grasps it, and lifts it. It then moves the bowl to the left, positions it over the open bottom drawer of the cabinet, and releases it inside. Finally, the arm retracts upwards and to the right.",
     "reason": null,
     "segments": [
       {
         "action": "Move arm down and forward to approach the black bowl from above",
         "start_sec": 0.0,
         "end_sec": 2.4
       },
       {
         "action": "Grasp the black bowl with the gripper",
         "start_sec": 2.4,
         "end_sec": 3.5
       },
       {
         "action": "Lift the bowl and move it to the left towards the open cabinet drawer",
         "start_sec": 3.5,
         "end_sec": 6.5
       },
       {
         "action": "Lower the bowl into the bottom drawer and release it",
         "start_sec": 6.5,
         "end_sec": 10.0
       },
       {
         "action": "Retract the arm upwards and to the right away from the drawer",
         "start_sec": 10.0,
         "end_sec": 16.7
       }
     ]
   },
   {
     "id": "libero_plus_019",
     "task": "pick up the butter and place it in the basket ligh",
     "scenario": "light",
     "duration": 9.334,
     "success": false,
     "eligible": true,
     "src": "/videos/libero_plus_019.mp4",
     "caption": "The robot arm moves from the right side of the workspace towards the left, approaching the yellow box (butter) from above. It hovers briefly over the object before retracting back to the right side without making contact or grasping the item.",
     "reason": "The robot failed to grasp the butter; it approached the object but retracted without picking it up.",
     "segments": [
       {
         "action": "Move arm from right side towards the yellow box on the left",
         "start_sec": 0.0,
         "end_sec": 4.0
       },
       {
         "action": "Hover over the yellow box",
         "start_sec": 4.0,
         "end_sec": 5.0
       },
       {
         "action": "Retract arm back to the right side",
         "start_sec": 5.0,
         "end_sec": 9.0
       }
     ]
   },
   {
     "id": "libero_plus_020",
     "task": "put the yellow and white mug in the microwave and close it",
     "scenario": "noise",
     "duration": 17.334,
     "success": true,
     "eligible": true,
     "src": "/videos/libero_plus_020.mp4",
     "caption": "The robot arm approaches the yellow and white mug on the table, grasps it, lifts it, and moves it into the microwave. The arm then retracts, leaving the mug inside the open microwave.",
     "reason": null,
     "segments": [
       {
         "action": "move arm towards mug and grasp",
         "start_sec": 0.0,
         "end_sec": 5.0
       },
       {
         "action": "lift mug and move into microwave",
         "start_sec": 5.0,
         "end_sec": 12.0
       },
       {
         "action": "release mug and retract arm",
         "start_sec": 12.0,
         "end_sec": 17.0
       }
     ]
   },
   {
     "id": "libero_plus_021",
     "task": "put both the alphabet soup and the tomato sauce in the basket",
     "scenario": "noise",
     "duration": 17.334,
     "success": false,
     "eligible": true,
     "src": "/videos/libero_plus_021.mp4",
     "caption": "The robot arm approaches the alphabet soup can on the table, grasps it, lifts it, and places it into the white basket on the left. The arm then retracts to the right, leaving the tomato sauce can on the table.",
     "reason": "The robot only placed the alphabet soup in the basket and did not pick up or place the tomato sauce.",
     "segments": [
       {
         "action": "Move arm towards the alphabet soup can and grasp it",
         "start_sec": 0.0,
         "end_sec": 4.0
       },
       {
         "action": "Lift the can and move it to the left towards the basket",
         "start_sec": 4.0,
         "end_sec": 7.0
       },
       {
         "action": "Place the can into the basket and release it",
         "start_sec": 7.0,
         "end_sec": 10.0
       },
       {
         "action": "Retract arm to the right and hold position",
         "start_sec": 10.0,
         "end_sec": 17.0
       }
     ]
   },
   {
     "id": "libero_plus_022",
     "task": "put the cream cheese on the bowl",
     "scenario": "noise",
     "duration": 10.0,
     "success": true,
     "eligible": true,
     "src": "/videos/libero_plus_022.mp4",
     "caption": "The robot arm approaches the blue rectangular object on the table from above, grasps it, and lifts it. The arm then moves the object to the right and places it onto the small round bowl.",
     "reason": null,
     "segments": [
       {
         "action": "move to the blue object",
         "start_sec": 0.0,
         "end_sec": 2.5
       },
       {
         "action": "grasp the blue object",
         "start_sec": 2.5,
         "end_sec": 4.0
       },
       {
         "action": "lift the blue object",
         "start_sec": 4.0,
         "end_sec": 5.0
       },
       {
         "action": "move the blue object to the bowl",
         "start_sec": 5.0,
         "end_sec": 7.5
       },
       {
         "action": "release the blue object on the bowl",
         "start_sec": 7.5,
         "end_sec": 9.0
       }
     ]
   },
   {
     "id": "libero_plus_023",
     "task": "pick up the book and place it in the back compartment of the caddy",
     "scenario": "noise",
     "duration": 17.334,
     "success": true,
     "eligible": true,
     "src": "/videos/libero_plus_023.mp4",
     "caption": "The robot arm approaches the black book on the table from above, grasps it, lifts it, and moves it to the right to place it into the back compartment of the caddy.",
     "reason": null,
     "segments": [
       {
         "action": "approach and grasp the book",
         "start_sec": 0.0,
         "end_sec": 5.0
       },
       {
         "action": "lift and move the book to the caddy",
         "start_sec": 5.0,
         "end_sec": 10.0
       },
       {
         "action": "place the book into the back compartment and release",
         "start_sec": 10.0,
         "end_sec": 17.0
       }
     ]
   },
   {
     "id": "libero_plus_024",
     "task": "pick up the black bowl between the plate and the ramekin and place it on the plate",
     "scenario": "obj",
     "duration": 7.334,
     "success": true,
     "eligible": true,
     "src": "/videos/libero_plus_024.mp4",
     "caption": "The robot arm moves from the top center to the left, approaching the black bowl located between the plate and the ramekin. It lowers its gripper to grasp the bowl from above, lifts it, and moves it to the right to place it onto the plate.",
     "reason": null,
     "segments": [
       {
         "action": "Move arm towards the black bowl and lower gripper to grasp it",
         "start_sec": 0.0,
         "end_sec": 4.0
       },
       {
         "action": "Lift the black bowl and move it to the right",
         "start_sec": 4.0,
         "end_sec": 5.5
       },
       {
         "action": "Place the black bowl onto the plate and release",
         "start_sec": 5.5,
         "end_sec": 7.0
       }
     ]
   },
   {
     "id": "libero_plus_025",
     "task": "put both moka pots on the stove",
     "scenario": "obj",
     "duration": 17.334,
     "success": false,
     "eligible": true,
     "src": "/videos/libero_plus_025.mp4",
     "caption": "The robot arm moves down to grasp the right moka pot by its handle, lifts it, and places it onto the front-left burner of the stove. The arm then retracts, leaving the left moka pot on the table.",
     "reason": "The robot only moved one of the two moka pots to the stove, failing to complete the instruction to put both pots on.",
     "segments": [
       {
         "action": "Move arm down and forward to approach the right moka pot, then close the gripper to grasp the handle.",
         "start_sec": 0.0,
         "end_sec": 5.0
       },
       {
         "action": "Lift the grasped moka pot and move it to the right, positioning it over the front-left burner of the stove.",
         "start_sec": 5.0,
         "end_sec": 10.0
       },
       {
         "action": "Lower the moka pot onto the stove burner, open the gripper to release it, and retract the arm upwards.",
         "start_sec": 10.0,
         "end_sec": 17.0
       }
     ]
   },
   {
     "id": "libero_plus_026",
     "task": "pick up the alphabet soup and place it in the basket",
     "scenario": "obj",
     "duration": 9.334,
     "success": true,
     "eligible": true,
     "src": "/videos/libero_plus_026.mp4",
     "caption": "The robot arm moves towards the blue can on the right, grasps it, and lifts it. It then moves the can to the left and lowers it into the basket, releasing it inside.",
     "reason": null,
     "segments": [
       {
         "action": "Move arm towards the blue can and grasp it",
         "start_sec": 0.0,
         "end_sec": 3.0
       },
       {
         "action": "Lift the can and move it to the left towards the basket",
         "start_sec": 3.0,
         "end_sec": 6.0
       },
       {
         "action": "Lower the can into the basket and release it",
         "start_sec": 6.0,
         "end_sec": 8.0
       },
       {
         "action": "Retract arm upwards and away from the basket",
         "start_sec": 8.0,
         "end_sec": 9.0
       }
     ]
   },
   {
     "id": "libero_plus_027",
     "task": "put the black bowl in the bottom drawer of the cabinet",
     "scenario": "obj",
     "duration": 17.334,
     "success": true,
     "eligible": true,
     "src": "/videos/libero_plus_027.mp4",
     "caption": "The robot arm approaches the black bowl on the table from above, grasps it, and lifts it. It then moves the bowl to the left towards the open bottom drawer of the cabinet and places it inside.",
     "reason": null,
     "segments": [
       {
         "action": "Move arm down and forward to approach the black bowl from above, then close the gripper to grasp it.",
         "start_sec": 0.0,
         "end_sec": 5.0
       },
       {
         "action": "Lift the grasped bowl and move it to the left towards the open bottom drawer.",
         "start_sec": 5.0,
         "end_sec": 12.0
       },
       {
         "action": "Lower the bowl into the drawer and open the gripper to release it.",
         "start_sec": 12.0,
         "end_sec": 16.0
       },
       {
         "action": "Retract the arm upwards and away from the drawer.",
         "start_sec": 16.0,
         "end_sec": 17.0
       }
     ]
   }
 ];
 
