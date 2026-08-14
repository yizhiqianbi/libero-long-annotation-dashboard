export type CaptionModelOutput = { caption: string; actions: string[]; objects: string[]; success: boolean | null; uncertainty: string | null; parsed: boolean; latency: number; raw: string; source: "unified_prompt" | "dense_fallback" };
export type CaptionCompare = { qwen: CaptionModelOutput; timelens2: CaptionModelOutput; timelens: CaptionModelOutput };

export const captionCompare: Record<string, CaptionCompare> = {
  "libero_long_000": {
    "qwen": {
      "caption": "The robot arm moves to the stove knob, turns it to activate the burner, and then lifts the moka pot from the counter to place it on the lit burner.",
      "actions": [
        "move arm to the stove knob",
        "turn the stove knob",
        "grasp the moka pot",
        "lift the moka pot",
        "place the moka pot on the burner"
      ],
      "objects": [
        "robot arm",
        "stove knob",
        "moka pot",
        "frying pan"
      ],
      "success": true,
      "uncertainty": null,
      "parsed": true,
      "latency": 10.67,
      "raw": "{\n  \"caption\": \"The robot arm moves to the stove knob, turns it to activate the burner, and then lifts the moka pot from the counter to place it on the lit burner.\",\n  \"actions\": [\n    \"move arm to the stove knob\",\n    \"turn the stove knob\",\n    \"grasp the moka pot\",\n    \"lift the moka pot\",\n    \"place the moka pot on the burner\"\n  ],\n  \"objects\": [\n    \"robot arm\",\n    \"stove knob\",\n    \"moka pot\",\n    \"frying pan\"\n  ],\n  \"success\": true,\n  \"uncertainty\": null\n}",
      "source": "unified_prompt"
    },
    "timelens2": {
      "caption": "The robot turns on the stove and places the moka pot on it.",
      "actions": [
        "turns on the stove",
        "places the moka pot on the stove"
      ],
      "objects": [
        "stove",
        "moka pot"
      ],
      "success": true,
      "uncertainty": null,
      "parsed": true,
      "latency": 5.729,
      "raw": "{\n  \"caption\": \"The robot turns on the stove and places the moka pot on it.\",\n  \"actions\": [\"turns on the stove\", \"places the moka pot on the stove\"],\n  \"objects\": [\"stove\", \"moka pot\"],\n  \"success\": true,\n  \"uncertainty\": null\n}",
      "source": "unified_prompt"
    },
    "timelens": {
      "caption": "The robot manipulates a moka pot and places it on a stove burner. The robot then turns on the stove burner.",
      "actions": [
        "The robot picks up the moka pot and places it on the stove burner.",
        "The robot turns on the stove burner."
      ],
      "objects": [
        "moka pot",
        "stove burner"
      ],
      "success": true,
      "uncertainty": null,
      "parsed": true,
      "latency": 6.006,
      "raw": "{\n  \"caption\": \"The robot manipulates a moka pot and places it on a stove burner. The robot then turns on the stove burner.\",\n  \"actions\": [\"The robot picks up the moka pot and places it on the stove burner.\", \"The robot turns on the stove burner.\"],\n  \"objects\": [\"moka pot\", \"stove burner\"],\n  \"success\": true,\n  \"uncertainty\": null\n}",
      "source": "unified_prompt"
    }
  },
  "libero_long_001": {
    "qwen": {
      "caption": "A robotic arm approaches a silver clock on the table, grasps it, and places it into an open drawer. The arm then closes the drawer.",
      "actions": [
        "move arm towards the clock",
        "grasp the clock",
        "lift the clock",
        "place the clock in the open drawer",
        "close the drawer"
      ],
      "objects": [
        "robotic arm",
        "clock",
        "drawer"
      ],
      "success": true,
      "uncertainty": "The object is a silver clock, not a black bowl as stated in the task description.",
      "parsed": true,
      "latency": 9.39,
      "raw": "{\n  \"caption\": \"A robotic arm approaches a silver clock on the table, grasps it, and places it into an open drawer. The arm then closes the drawer.\",\n  \"actions\": [\n    \"move arm towards the clock\",\n    \"grasp the clock\",\n    \"lift the clock\",\n    \"place the clock in the open drawer\",\n    \"close the drawer\"\n  ],\n  \"objects\": [\n    \"robotic arm\",\n    \"clock\",\n    \"drawer\"\n  ],\n  \"success\": true,\n  \"uncertainty\": \"The object is a silver clock, not a black bowl as stated in the task description.\"\n}",
      "source": "unified_prompt"
    },
    "timelens2": {
      "caption": "A robotic arm picks up a pressure gauge and places it into a cabinet.",
      "actions": [
        "robotic arm picks up pressure gauge",
        "robotic arm places pressure gauge into cabinet"
      ],
      "objects": [
        "robotic arm",
        "pressure gauge",
        "cabinet"
      ],
      "success": true,
      "uncertainty": null,
      "parsed": true,
      "latency": 5.357,
      "raw": "{\n  \"caption\": \"A robotic arm picks up a pressure gauge and places it into a cabinet.\",\n  \"actions\": [\"robotic arm picks up pressure gauge\", \"robotic arm places pressure gauge into cabinet\"],\n  \"objects\": [\"robotic arm\", \"pressure gauge\", \"cabinet\"],\n  \"success\": true,\n  \"uncertainty\": null\n}",
      "source": "unified_prompt"
    },
    "timelens": {
      "caption": "The robot manipulates a black bowl, moving it towards a cabinet drawer and then closing the drawer.",
      "actions": [
        "The robot picks up the black bowl.",
        "The robot places the black bowl into the cabinet drawer and closes it."
      ],
      "objects": [
        "black bowl",
        "cabinet drawer"
      ],
      "success": true,
      "uncertainty": null,
      "parsed": true,
      "latency": 5.485,
      "raw": "{\n  \"caption\": \"The robot manipulates a black bowl, moving it towards a cabinet drawer and then closing the drawer.\",\n  \"actions\": [\"The robot picks up the black bowl.\", \"The robot places the black bowl into the cabinet drawer and closes it.\"],\n  \"objects\": [\"black bowl\", \"cabinet drawer\"],\n  \"success\": true,\n  \"uncertainty\": null\n}",
      "source": "unified_prompt"
    }
  },
  "libero_long_002": {
    "qwen": {
      "caption": "A robotic arm approaches a yellow and white mug on the counter, grasps it, and moves it into the open microwave. The arm then closes the microwave door.",
      "actions": [
        "move arm to the yellow and white mug",
        "grasp the mug",
        "lift and move the mug into the microwave",
        "release the mug",
        "close the microwave door"
      ],
      "objects": [
        "robotic arm",
        "yellow and white mug",
        "microwave"
      ],
      "success": true,
      "uncertainty": null,
      "parsed": true,
      "latency": 9.07,
      "raw": "{\n  \"caption\": \"A robotic arm approaches a yellow and white mug on the counter, grasps it, and moves it into the open microwave. The arm then closes the microwave door.\",\n  \"actions\": [\n    \"move arm to the yellow and white mug\",\n    \"grasp the mug\",\n    \"lift and move the mug into the microwave\",\n    \"release the mug\",\n    \"close the microwave door\"\n  ],\n  \"objects\": [\n    \"robotic arm\",\n    \"yellow and white mug\",\n    \"microwave\"\n  ],\n  \"success\": true,\n  \"uncertainty\": null\n}",
      "source": "unified_prompt"
    },
    "timelens2": {
      "caption": "A robotic arm picks up a yellow and white mug and places it inside a microwave, then closes the microwave door.",
      "actions": [
        "robotic arm picks up yellow and white mug",
        "robotic arm places mug inside microwave",
        "robotic arm closes microwave door"
      ],
      "objects": [
        "robotic arm",
        "yellow and white mug",
        "microwave"
      ],
      "success": true,
      "uncertainty": null,
      "parsed": true,
      "latency": 6.613,
      "raw": "{\n  \"caption\": \"A robotic arm picks up a yellow and white mug and places it inside a microwave, then closes the microwave door.\",\n  \"actions\": [\"robotic arm picks up yellow and white mug\", \"robotic arm places mug inside microwave\", \"robotic arm closes microwave door\"],\n  \"objects\": [\"robotic arm\", \"yellow and white mug\", \"microwave\"],\n  \"success\": true,\n  \"uncertainty\": null\n}",
      "source": "unified_prompt"
    },
    "timelens": {
      "caption": "The robot manipulates the yellow and white mug, placing it into the microwave, then closes the microwave door.",
      "actions": [
        "The robot picks up the yellow and white mug.",
        "The robot places the mug into the microwave and closes the door."
      ],
      "objects": [
        "yellow and white mug",
        "microwave"
      ],
      "success": true,
      "uncertainty": null,
      "parsed": true,
      "latency": 6.199,
      "raw": "{\n  \"caption\": \"The robot manipulates the yellow and white mug, placing it into the microwave, then closes the microwave door.\",\n  \"actions\": [\"The robot picks up the yellow and white mug.\", \"The robot places the mug into the microwave and closes the door.\"],\n  \"objects\": [\"yellow and white mug\", \"microwave\"],\n  \"success\": true,\n  \"uncertainty\": null\n}",
      "source": "unified_prompt"
    }
  },
  "libero_long_003": {
    "qwen": {
      "caption": "A robotic arm moves upward to grasp a silver moka pot from the counter and places it on the stovetop. The arm then retracts and moves to the right to grasp a second moka pot, lifting it and placing it next to the first one on the stove.",
      "actions": [
        "move arm up to grasp the first moka pot",
        "lift and place the first moka pot on the stove",
        "retract arm and move to the right",
        "grasp the second moka pot",
        "lift and place the second moka pot on the stove"
      ],
      "objects": [
        "robotic arm",
        "moka pot",
        "stove"
      ],
      "success": true,
      "uncertainty": null,
      "parsed": true,
      "latency": 11.631,
      "raw": "{\n  \"caption\": \"A robotic arm moves upward to grasp a silver moka pot from the counter and places it on the stovetop. The arm then retracts and moves to the right to grasp a second moka pot, lifting it and placing it next to the first one on the stove.\",\n  \"actions\": [\n    \"move arm up to grasp the first moka pot\",\n    \"lift and place the first moka pot on the stove\",\n    \"retract arm and move to the right\",\n    \"grasp the second moka pot\",\n    \"lift and place the second moka pot on the stove\"\n  ],\n  \"objects\": [\n    \"robotic arm\",\n    \"moka pot\",\n    \"stove\"\n  ],\n  \"success\": true,\n  \"uncertainty\": null\n}",
      "source": "unified_prompt"
    },
    "timelens2": {
      "caption": "A robotic arm lifts a moka pot and places it on the stove, then repeats the action with another moka pot.",
      "actions": [
        "robotic arm lifts moka pot",
        "robotic arm places moka pot on stove"
      ],
      "objects": [
        "robotic arm",
        "moka pot",
        "stove"
      ],
      "success": true,
      "uncertainty": null,
      "parsed": true,
      "latency": 5.428,
      "raw": "{\n  \"caption\": \"A robotic arm lifts a moka pot and places it on the stove, then repeats the action with another moka pot.\",\n  \"actions\": [\"robotic arm lifts moka pot\", \"robotic arm places moka pot on stove\"],\n  \"objects\": [\"robotic arm\", \"moka pot\", \"stove\"],\n  \"success\": true,\n  \"uncertainty\": null\n}",
      "source": "unified_prompt"
    },
    "timelens": {
      "caption": "The robot manipulates two moka pots, placing them on the stove.",
      "actions": [
        "The robot lifts the first moka pot and places it on the stove.",
        "The robot lifts the second moka pot and places it on the stove."
      ],
      "objects": [
        "moka pot 1",
        "moka pot 2"
      ],
      "success": true,
      "uncertainty": null,
      "parsed": true,
      "latency": 6.024,
      "raw": "{\n  \"caption\": \"The robot manipulates two moka pots, placing them on the stove.\",\n  \"actions\": [\"The robot lifts the first moka pot and places it on the stove.\", \"The robot lifts the second moka pot and places it on the stove.\"],\n  \"objects\": [\"moka pot 1\", \"moka pot 2\"],\n  \"success\": true,\n  \"uncertainty\": null\n}",
      "source": "unified_prompt"
    }
  },
  "libero_long_004": {
    "qwen": {
      "caption": "The robot arm picks up the blue can from the table and places it into the basket on the right. It then picks up the small blue box and places it into the same basket.",
      "actions": [
        "grasp the blue can",
        "move the blue can to the basket",
        "release the blue can into the basket",
        "grasp the small blue box",
        "move the small blue box to the basket",
        "release the small blue box into the basket"
      ],
      "objects": [
        "blue can",
        "small blue box",
        "basket",
        "robot arm"
      ],
      "success": true,
      "uncertainty": null,
      "parsed": true,
      "latency": 10.477,
      "raw": "{\n  \"caption\": \"The robot arm picks up the blue can from the table and places it into the basket on the right. It then picks up the small blue box and places it into the same basket.\",\n  \"actions\": [\n    \"grasp the blue can\",\n    \"move the blue can to the basket\",\n    \"release the blue can into the basket\",\n    \"grasp the small blue box\",\n    \"move the small blue box to the basket\",\n    \"release the small blue box into the basket\"\n  ],\n  \"objects\": [\n    \"blue can\",\n    \"small blue box\",\n    \"basket\",\n    \"robot arm\"\n  ],\n  \"success\": true,\n  \"uncertainty\": null\n}",
      "source": "unified_prompt"
    },
    "timelens2": {
      "caption": "The robot picks up a blue box and places it into a basket.",
      "actions": [
        "robot picks up blue box",
        "robot places blue box in basket"
      ],
      "objects": [
        "blue box",
        "basket"
      ],
      "success": true,
      "uncertainty": null,
      "parsed": true,
      "latency": 4.377,
      "raw": "{\n  \"caption\": \"The robot picks up a blue box and places it into a basket.\",\n  \"actions\": [\"robot picks up blue box\", \"robot places blue box in basket\"],\n  \"objects\": [\"blue box\", \"basket\"],\n  \"success\": true,\n  \"uncertainty\": null\n}",
      "source": "unified_prompt"
    },
    "timelens": {
      "caption": "The robot picks up the alphabet soup and places it in the basket, then picks up the cream cheese box and places it in the basket.",
      "actions": [
        "Pick up alphabet soup",
        "Place alphabet soup in basket",
        "Pick up cream cheese box",
        "Place cream cheese box in basket"
      ],
      "objects": [
        "alphabet soup",
        "cream cheese box",
        "basket"
      ],
      "success": true,
      "uncertainty": null,
      "parsed": true,
      "latency": 5.981,
      "raw": "{\n  \"caption\": \"The robot picks up the alphabet soup and places it in the basket, then picks up the cream cheese box and places it in the basket.\",\n  \"actions\": [\"Pick up alphabet soup\", \"Place alphabet soup in basket\", \"Pick up cream cheese box\", \"Place cream cheese box in basket\"],\n  \"objects\": [\"alphabet soup\", \"cream cheese box\", \"basket\"],\n  \"success\": true,\n  \"uncertainty\": null\n}",
      "source": "unified_prompt"
    }
  },
  "libero_long_005": {
    "qwen": {
      "caption": "A robotic arm picks up a blue can from the table and places it into the basket on the right. The arm then picks up a red can and places it into the same basket.",
      "actions": [
        "move to the blue can",
        "grasp the blue can",
        "lift the blue can",
        "move the blue can to the basket",
        "release the blue can into the basket",
        "move to the red can",
        "grasp the red can",
        "lift the red can",
        "move the red can to the basket",
        "release the red can into the basket"
      ],
      "objects": [
        "blue can",
        "red can",
        "basket",
        "robotic arm"
      ],
      "success": true,
      "uncertainty": null,
      "parsed": true,
      "latency": 12.411,
      "raw": "{\n  \"caption\": \"A robotic arm picks up a blue can from the table and places it into the basket on the right. The arm then picks up a red can and places it into the same basket.\",\n  \"actions\": [\n    \"move to the blue can\",\n    \"grasp the blue can\",\n    \"lift the blue can\",\n    \"move the blue can to the basket\",\n    \"release the blue can into the basket\",\n    \"move to the red can\",\n    \"grasp the red can\",\n    \"lift the red can\",\n    \"move the red can to the basket\",\n    \"release the red can into the basket\"\n  ],\n  \"objects\": [\n    \"blue can\",\n    \"red can\",\n    \"basket\",\n    \"robotic arm\"\n  ],\n  \"success\": true,\n  \"uncertainty\": null\n}",
      "source": "unified_prompt"
    },
    "timelens2": {
      "caption": "The robot picks up a blue and white box and places it into a silver basket.",
      "actions": [
        "The robot picks up a blue and white box.",
        "The robot places the box into a silver basket."
      ],
      "objects": [
        "blue and white box",
        "silver basket"
      ],
      "success": true,
      "uncertainty": null,
      "parsed": true,
      "latency": 4.364,
      "raw": "{\n  \"caption\": \"The robot picks up a blue and white box and places it into a silver basket.\",\n  \"actions\": [\"The robot picks up a blue and white box.\", \"The robot places the box into a silver basket.\"],\n  \"objects\": [\"blue and white box\", \"silver basket\"],\n  \"success\": true,\n  \"uncertainty\": null\n}",
      "source": "unified_prompt"
    },
    "timelens": {
      "caption": "The robot picks up the alphabet soup and places it in the basket, then picks up the tomato sauce and places it in the basket.",
      "actions": [
        "Pick up alphabet soup",
        "Place alphabet soup in basket",
        "Pick up tomato sauce",
        "Place tomato sauce in basket"
      ],
      "objects": [
        "alphabet soup",
        "tomato sauce",
        "basket"
      ],
      "success": true,
      "uncertainty": null,
      "parsed": true,
      "latency": 5.745,
      "raw": "{\n  \"caption\": \"The robot picks up the alphabet soup and places it in the basket, then picks up the tomato sauce and places it in the basket.\",\n  \"actions\": [\"Pick up alphabet soup\", \"Place alphabet soup in basket\", \"Pick up tomato sauce\", \"Place tomato sauce in basket\"],\n  \"objects\": [\"alphabet soup\", \"tomato sauce\", \"basket\"],\n  \"success\": true,\n  \"uncertainty\": null\n}",
      "source": "unified_prompt"
    }
  },
  "libero_long_006": {
    "qwen": {
      "caption": "The robot arm picks up a blue box from the table and places it into the metal basket on the right. It then picks up an orange box from the table and places it into the same basket.",
      "actions": [
        "grasp the blue box",
        "move the blue box to the basket",
        "release the blue box into the basket",
        "grasp the orange box",
        "move the orange box to the basket",
        "release the orange box into the basket"
      ],
      "objects": [
        "blue box",
        "orange box",
        "metal basket",
        "robot arm"
      ],
      "success": true,
      "uncertainty": null,
      "parsed": true,
      "latency": 10.515,
      "raw": "{\n  \"caption\": \"The robot arm picks up a blue box from the table and places it into the metal basket on the right. It then picks up an orange box from the table and places it into the same basket.\",\n  \"actions\": [\n    \"grasp the blue box\",\n    \"move the blue box to the basket\",\n    \"release the blue box into the basket\",\n    \"grasp the orange box\",\n    \"move the orange box to the basket\",\n    \"release the orange box into the basket\"\n  ],\n  \"objects\": [\n    \"blue box\",\n    \"orange box\",\n    \"metal basket\",\n    \"robot arm\"\n  ],\n  \"success\": true,\n  \"uncertainty\": null\n}",
      "source": "unified_prompt"
    },
    "timelens2": {
      "caption": "The robot picks up a cream cheese box and places it into a basket, then picks up a butter container and places it into the same basket.",
      "actions": [
        "pick up cream cheese box",
        "place cream cheese box in basket",
        "pick up butter container",
        "place butter container in basket"
      ],
      "objects": [
        "cream cheese box",
        "butter container",
        "basket"
      ],
      "success": true,
      "uncertainty": null,
      "parsed": true,
      "latency": 7.142,
      "raw": "{\n  \"caption\": \"The robot picks up a cream cheese box and places it into a basket, then picks up a butter container and places it into the same basket.\",\n  \"actions\": [\"pick up cream cheese box\", \"place cream cheese box in basket\", \"pick up butter container\", \"place butter container in basket\"],\n  \"objects\": [\"cream cheese box\", \"butter container\", \"basket\"],\n  \"success\": true,\n  \"uncertainty\": null\n}",
      "source": "unified_prompt"
    },
    "timelens": {
      "caption": "The robot manipulates a cream cheese box and a butter container, placing them into a basket.",
      "actions": [
        "The robot picks up the cream cheese box.",
        "The robot places the cream cheese box into the basket.",
        "The robot picks up the butter container.",
        "The robot places the butter container into the basket."
      ],
      "objects": [
        "cream cheese box",
        "butter container",
        "basket"
      ],
      "success": true,
      "uncertainty": null,
      "parsed": true,
      "latency": 6.324,
      "raw": "{\n  \"caption\": \"The robot manipulates a cream cheese box and a butter container, placing them into a basket.\",\n  \"actions\": [\"The robot picks up the cream cheese box.\", \"The robot places the cream cheese box into the basket.\", \"The robot picks up the butter container.\", \"The robot places the butter container into the basket.\"],\n  \"objects\": [\"cream cheese box\", \"butter container\", \"basket\"],\n  \"success\": true,\n  \"uncertainty\": null\n}",
      "source": "unified_prompt"
    }
  },
  "libero_long_007": {
    "qwen": {
      "caption": "A dual-arm robot manipulates two mugs on a wooden table. The left arm grasps a white mug and moves it to the left plate. The right arm then grasps a yellow and white mug and moves it to the right plate.",
      "actions": [
        "Left arm approaches the white mug from the left and closes its gripper to grasp the handle.",
        "Left arm lifts the white mug and transports it to the left side of the table.",
        "Left arm lowers the white mug onto the left plate and opens the gripper to release it.",
        "Left arm retracts away from the plate while the right arm moves into position to approach the yellow and white mug.",
        "Right arm closes its gripper to grasp the handle of the yellow and white mug.",
        "Right arm lifts the yellow and white mug and transports it to the right side of the table.",
        "Right arm lowers the yellow and white mug onto the right plate and opens the gripper to release it."
      ],
      "objects": [],
      "success": true,
      "uncertainty": "统一 caption prompt 未返回 JSON；使用 dense caption 作为回退。",
      "parsed": false,
      "latency": 0.776,
      "raw": "<null>",
      "source": "dense_fallback"
    },
    "timelens2": {
      "caption": "The robot moves the white mug to the left plate and the yellow and white mug to the right plate.",
      "actions": [
        "robot moves white mug to left plate",
        "robot moves yellow and white mug to right plate"
      ],
      "objects": [
        "white mug",
        "yellow and white mug",
        "left plate",
        "right plate"
      ],
      "success": true,
      "uncertainty": null,
      "parsed": true,
      "latency": 6.128,
      "raw": "{\n  \"caption\": \"The robot moves the white mug to the left plate and the yellow and white mug to the right plate.\",\n  \"actions\": [\"robot moves white mug to left plate\", \"robot moves yellow and white mug to right plate\"],\n  \"objects\": [\"white mug\", \"yellow and white mug\", \"left plate\", \"right plate\"],\n  \"success\": true,\n  \"uncertainty\": null\n}",
      "source": "unified_prompt"
    },
    "timelens": {
      "caption": "The robot moves the white mug to the left plate and the yellow mug to the right plate.",
      "actions": [
        "The robot moves the white mug to the left plate.",
        "The robot moves the yellow mug to the right plate."
      ],
      "objects": [
        "white mug",
        "yellow mug"
      ],
      "success": true,
      "uncertainty": null,
      "parsed": true,
      "latency": 4.899,
      "raw": "{\n  \"caption\": \"The robot moves the white mug to the left plate and the yellow mug to the right plate.\",\n  \"actions\": [\"The robot moves the white mug to the left plate.\", \"The robot moves the yellow mug to the right plate.\"],\n  \"objects\": [\"white mug\", \"yellow mug\"],\n  \"success\": true,\n  \"uncertainty\": null\n}",
      "source": "unified_prompt"
    }
  },
  "libero_long_008": {
    "qwen": {
      "caption": "A robotic arm grasps a white mug from the table and places it onto a plate. The arm then moves to grasp a small brown box and positions it to the right of the plate.",
      "actions": [
        "grasp the white mug",
        "move the mug to the plate",
        "place the mug on the plate",
        "grasp the brown box",
        "move the box to the right of the plate"
      ],
      "objects": [
        "white mug",
        "plate",
        "brown box",
        "robotic arm"
      ],
      "success": true,
      "uncertainty": null,
      "parsed": true,
      "latency": 9.695,
      "raw": "{\n  \"caption\": \"A robotic arm grasps a white mug from the table and places it onto a plate. The arm then moves to grasp a small brown box and positions it to the right of the plate.\",\n  \"actions\": [\n    \"grasp the white mug\",\n    \"move the mug to the plate\",\n    \"place the mug on the plate\",\n    \"grasp the brown box\",\n    \"move the box to the right of the plate\"\n  ],\n  \"objects\": [\n    \"white mug\",\n    \"plate\",\n    \"brown box\",\n    \"robotic arm\"\n  ],\n  \"success\": true,\n  \"uncertainty\": null\n}",
      "source": "unified_prompt"
    },
    "timelens2": {
      "caption": "The robot moves the white mug and places it on the plate.",
      "actions": [
        "The robot picks up the white mug.",
        "The robot places the white mug on the plate."
      ],
      "objects": [
        "white mug",
        "plate"
      ],
      "success": true,
      "uncertainty": null,
      "parsed": true,
      "latency": 4.582,
      "raw": "{\n  \"caption\": \"The robot moves the white mug and places it on the plate.\",\n  \"actions\": [\"The robot picks up the white mug.\", \"The robot places the white mug on the plate.\"],\n  \"objects\": [\"white mug\", \"plate\"],\n  \"success\": true,\n  \"uncertainty\": null\n}",
      "source": "unified_prompt"
    },
    "timelens": {
      "caption": "The robot manipulates the white mug and places it on the plate. The robot then moves the chocolate pudding to the right of the plate.",
      "actions": [
        "The robot places the white mug on the plate.",
        "The robot moves the chocolate pudding to the right of the plate."
      ],
      "objects": [
        "white mug",
        "plate",
        "chocolate pudding"
      ],
      "success": true,
      "uncertainty": null,
      "parsed": true,
      "latency": 5.012,
      "raw": "{\n  \"caption\": \"The robot manipulates the white mug and places it on the plate. The robot then moves the chocolate pudding to the right of the plate.\",\n  \"actions\": [\"The robot places the white mug on the plate.\", \"The robot moves the chocolate pudding to the right of the plate.\"],\n  \"objects\": [\"white mug\", \"plate\", \"chocolate pudding\"],\n  \"success\": true,\n  \"uncertainty\": null\n}",
      "source": "unified_prompt"
    }
  },
  "libero_long_009": {
    "qwen": {
      "caption": "A robotic arm approaches a black book lying on a wooden surface, grasps it, and moves it to the left. The arm then lowers the book into the back compartment of a brown caddy.",
      "actions": [
        "move arm towards the book",
        "grasp the book",
        "lift the book",
        "move the book to the caddy",
        "lower the book into the back compartment"
      ],
      "objects": [
        "robotic arm",
        "book",
        "caddy",
        "mug"
      ],
      "success": true,
      "uncertainty": null,
      "parsed": true,
      "latency": 9.316,
      "raw": "{\n  \"caption\": \"A robotic arm approaches a black book lying on a wooden surface, grasps it, and moves it to the left. The arm then lowers the book into the back compartment of a brown caddy.\",\n  \"actions\": [\n    \"move arm towards the book\",\n    \"grasp the book\",\n    \"lift the book\",\n    \"move the book to the caddy\",\n    \"lower the book into the back compartment\"\n  ],\n  \"objects\": [\n    \"robotic arm\",\n    \"book\",\n    \"caddy\",\n    \"mug\"\n  ],\n  \"success\": true,\n  \"uncertainty\": null\n}",
      "source": "unified_prompt"
    },
    "timelens2": {
      "caption": "The robot picks up a book from the table and places it into the back compartment of a caddy.",
      "actions": [
        "The robot picks up the book.",
        "The robot places the book into the caddy."
      ],
      "objects": [
        "book",
        "caddy"
      ],
      "success": true,
      "uncertainty": null,
      "parsed": true,
      "latency": 5.359,
      "raw": "{\n  \"caption\": \"The robot picks up a book from the table and places it into the back compartment of a caddy.\",\n  \"actions\": [\"The robot picks up the book.\", \"The robot places the book into the caddy.\"],\n  \"objects\": [\"book\", \"caddy\"],\n  \"success\": true,\n  \"uncertainty\": null\n}",
      "source": "unified_prompt"
    },
    "timelens": {
      "caption": "The robot manipulates a black book, moving it from a position near the top of the caddy to the back compartment.",
      "actions": [
        "The robot grasps the book.",
        "The robot places the book into the back compartment of the caddy."
      ],
      "objects": [
        "book",
        "caddy"
      ],
      "success": true,
      "uncertainty": null,
      "parsed": true,
      "latency": 5.188,
      "raw": "{\n  \"caption\": \"The robot manipulates a black book, moving it from a position near the top of the caddy to the back compartment.\",\n  \"actions\": [\"The robot grasps the book.\", \"The robot places the book into the back compartment of the caddy.\"],\n  \"objects\": [\"book\", \"caddy\"],\n  \"success\": true,\n  \"uncertainty\": null\n}",
      "source": "unified_prompt"
    }
  }
};

