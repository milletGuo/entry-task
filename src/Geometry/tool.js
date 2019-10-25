import Point from './Point';

/**
 * 构建折线数组
 * @returns {Array<Point>} paths 折线拐点数组
 */
export function createPaths() {
    let paths = [];
    let vertexNum = Math.round(Math.random() * 10);
    vertexNum = vertexNum < 3 ? 3 : vertexNum;
    for (let i = 0; i < vertexNum; i++) {
        let point = new Point();
        paths.push(point);
    }
    return paths;
}

/**
 * 构建多边形数组
 * @returns {Array<Point>} rings 多边形顶点数组
 */
export function createRings() {
    let rings = createPaths();
    rings.push(rings[0]);
    return rings;
}
