// === BEGIN CODE FROM CLINTON === //
const SOURCE = "clinton2";
const SOURCE_CLINTON1 = "clinton1";
const SOURCE_CLINTON2 = "clinton2";
const SOURCE_TALITHA = "talitha";
const SOURCES = {};
const begin = () => {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");

    const [paintFrame] = SOURCES[SOURCE]();

    frame(context, canvas, paintFrame)();
}

const BORDER = 10;
const FRAME_DELAY = 10;
const MIN_X = () => 0 + BORDER;
const MIN_Y = () => 0 + BORDER;
const MAX_X = () => window.innerWidth - BORDER;
const MAX_Y = () => window.innerHeight - BORDER;
const RANDOM = (min, max) => Math.random() * (max - min) + min;
const RANDOMINT = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const RANDOM_X_POINT = (width) => RANDOM(MAX_X() - width * 2, MIN_X() + width);
const RANDOM_Y_POINT = (height) => RANDOM(MAX_Y() - height * 2, MIN_Y() + height);
const RANDOM_SPEED = (min, max) => RANDOM(min, max);
const RANDOM_COLOR = () => hslToHex(RANDOMINT(0, 360), 100, 50);
const RANDOM_DIRECTION = () => RANDOMINT(0,1) === 0 ? 1 : -1;
const SLICE_POINTS = (point1, point2, count) => {
    const slices = [];
    for (let i = 0 ; i < count ; i++) {
        slices.push(point1 + i * (point2 - point1) / (count - 1));
    }
    return slices;
}

const hslToHex = (h, s, l) => {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
}

frame = (context, canvas, paintFrame) => () => {
    canvas.width  = MAX_X() + BORDER;
    canvas.height = MAX_Y() + BORDER;
    
    // Clear
    context.fillStyle = "#000000";
    context.fillRect(MIN_X() - BORDER, MIN_Y() - BORDER, MAX_X() + (BORDER * 2), MAX_Y() + (BORDER * 2));
    context.lineWidth = 2;

    // Draw a border
    context.strokeStyle = "#AAAAAA";
    context.strokeRect(MIN_X(), MIN_Y(), MAX_X() - BORDER, MAX_Y() - BORDER);

    paintFrame(context);

    repaint(context, canvas, paintFrame);
}

repaint = (context, canvas, paintFrame) => setTimeout(() => requestAnimationFrame(frame(context, canvas, paintFrame)), FRAME_DELAY);
// === END CODE FROM CLINTON === //

// === BEGIN SAMPLE CODE FROM CLINTON === //
SOURCES[SOURCE_CLINTON1] = () => {
    const NUM_BALLS = 100;
    const RECT_WIDTH = 10;
    const RECT_HEIGHT = 10;
    const MIN_SPEED = 0.1;
    const MAX_SPEED = 5.0;

    const points = [];
    fillData = (numPoints) => {
        for(let i = 0 ; i < numPoints ; i++) {
            points.push({
                color: RANDOM_COLOR(),
                x: {
                    loc: RANDOM_X_POINT(RECT_WIDTH),
                    speed: RANDOM_SPEED(MIN_SPEED, MAX_SPEED),
                    direction: RANDOM_DIRECTION(),
                },
                y: {
                    loc: RANDOM_Y_POINT(RECT_HEIGHT),
                    speed: RANDOM_SPEED(MIN_SPEED, MAX_SPEED),
                    direction: RANDOM_DIRECTION(),
                },
            });
        }
    }
    fillData(NUM_BALLS);

    const paintFrame = context => {
        points.forEach((point) => {
            context.fillStyle = point.color;
            context.fillRect(point.x.loc, point.y.loc, RECT_WIDTH, RECT_HEIGHT);
        
            if(point.x.loc > MAX_X() - RECT_WIDTH || point.x.loc < MIN_X()) {
                point.x.loc -= point.x.speed * point.x.direction;
                point.x.speed = Math.max(MIN_SPEED, Math.min(MAX_SPEED, point.x.speed * RANDOM(0.5, 2.0)));
                point.x.direction *= -1;
            }
            if(point.y.loc > MAX_Y() - RECT_HEIGHT || point.y.loc < MIN_Y()) {
                point.y.loc -= point.y.speed * point.y.direction;
                point.y.speed = Math.max(MIN_SPEED, Math.min(MAX_SPEED, point.y.speed * RANDOM(0.5, 2.0)));
                point.y.direction *= -1;
            }

            point.x.loc += point.x.speed * point.x.direction;
            point.y.loc += point.y.speed * point.y.direction;
        });
    }

    return [paintFrame];
}
// === END SAMPLE CODE FROM CLINTON === //

// === BEGIN SAMPLE CODE FROM CLINTON === //
SOURCES[SOURCE_CLINTON2] = () => {
    const NUM_BALLS = 4;
    const NUM_SLICES = 50;
    const RECT_WIDTH = 10;
    const RECT_HEIGHT = 10;
    const MIN_SPEED = 2.8;
    const MAX_SPEED = 8.0;

    const points = [];
    fillData = (numPoints) => {
        for(let i = 0 ; i < numPoints ; i++) {
            points.push({
                color: RANDOM(0, 360),
                x: {
                    loc: RANDOM_X_POINT(RECT_WIDTH),
                    speed: RANDOM_SPEED(MIN_SPEED, MAX_SPEED),
                    direction: RANDOM_DIRECTION(),
                },
                y: {
                    loc: RANDOM_Y_POINT(RECT_HEIGHT),
                    speed: RANDOM_SPEED(MIN_SPEED, MAX_SPEED),
                    direction: RANDOM_DIRECTION(),
                },
            });
        }
    }
    fillData(NUM_BALLS);

    const paintFrame = context => {
        const slicedPointsX1 = SLICE_POINTS(points[0].x.loc, points[1].x.loc, NUM_SLICES);
        const slicedPointsY1 = SLICE_POINTS(points[0].y.loc, points[1].y.loc, NUM_SLICES);
        const slicedPointsX2 = SLICE_POINTS(points[2].x.loc, points[3].x.loc, NUM_SLICES);
        const slicedPointsY2 = SLICE_POINTS(points[2].y.loc, points[3].y.loc, NUM_SLICES);

        for (let i = 0 ; i < slicedPointsX1.length ; i++) {
            // context.fillStyle = hslToHex(points[0].color, 100, 50);
            // context.fillRect(slicedPointsX1[i], slicedPointsY1[i], RECT_WIDTH, RECT_HEIGHT);

            // context.fillStyle = hslToHex(points[3].color, 100, 50);
            // context.fillRect(slicedPointsX2[i], slicedPointsY2[i], RECT_WIDTH, RECT_HEIGHT);

            const grad = context.createLinearGradient(slicedPointsX1[i], slicedPointsY1[i], slicedPointsX2[i], slicedPointsY2[i]);
            grad.addColorStop(0, hslToHex(points[0].color, 100, 50));
            grad.addColorStop(1, hslToHex(points[3].color, 100, 50));
            context.strokeStyle = grad;

            context.lineWidth = 2;
            context.beginPath();
            context.moveTo(slicedPointsX1[i], slicedPointsY1[i]);
            context.lineTo(slicedPointsX2[i], slicedPointsY2[i]);
            context.stroke();
        }

        points.forEach((point) => {
            point.color = (point.color + RANDOMINT(0, 4)) % 360
            if(point.x.loc > MAX_X() - RECT_WIDTH || point.x.loc < MIN_X()) {
                point.x.loc -= point.x.speed * point.x.direction;
                point.x.speed = Math.max(MIN_SPEED, Math.min(MAX_SPEED, point.x.speed * RANDOM(0.5, 2.0)));
                point.x.direction *= -1;
            }
            if(point.y.loc > MAX_Y() - RECT_HEIGHT || point.y.loc < MIN_Y()) {
                point.y.loc -= point.y.speed * point.y.direction;
                point.y.speed = Math.max(MIN_SPEED, Math.min(MAX_SPEED, point.y.speed * RANDOM(0.5, 2.0)));
                point.y.direction *= -1;
            }

            point.x.loc += point.x.speed * point.x.direction;
            point.y.loc += point.y.speed * point.y.direction;
        });        
    }

    return [paintFrame];
}
// === END SAMPLE CODE FROM CLINTON === //


// === BEGIN CODE FROM TALITHA === //
SOURCES[SOURCE_TALITHA] = () => {
    const RECT_WIDTH = 10;
    const RECT_HEIGHT = 10;

    const point = {
        x: RANDOM_X_POINT(RECT_WIDTH),
        y: RANDOM_Y_POINT(RECT_HEIGHT),
    }

    const speed = {
        x: 4,
        y: 0
    }

    const paintFrame = context => {
        // Draw our 'point'
        context.fillStyle = "#FF0000";
        context.fillRect(point.x, point.y, RECT_WIDTH, RECT_HEIGHT);

        // Move around
        point.x += speed.x;
        point.y += speed.y;

        if(point.x >= MAX_X() - RECT_WIDTH || point.x <= MIN_X()) {
            speed.x *= -1;
        }
    }

    return  [paintFrame];
}

// === END CODE FROM TALITHA === //
