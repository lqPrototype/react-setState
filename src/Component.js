import { SyncLane } from "./ReactFiberLane";
import scheduleUpdateOnFiber from './scheduleUpdateOnFiber'

export const createUpdate = (eventTime, lane) => {
    const update = {
        eventTime,
        lane,
        tag: undefined,
        payload: null,
        callback: null,
        next: null,
    };
    return update;
}

export const enqueueUpdate = (fiber, update, lane) => {

}

// 默认返回同步的车道： 源码根据事件优先级计算赛道：
// https://github.com/facebook/react/blob/1ad8d81292415e26ac070dec03ad84c11fbe207d/packages/react-reconciler/src/ReactFiberWorkLoop.new.js#L375
// https://github.com/facebook/react/blob/1ad8d81292415e26ac070dec03ad84c11fbe207d/packages/react-reconciler/src/ReactFiberLane.new.js#L691
const getLane = (fiber) => SyncLane

const classComponentUpdater = {
    /**
     * 
     * @param {*} componentInstance  组件instance
     * @param {*} partialState  传参
     */
    enqueueSetState(componentInstance, payload, callback) {
        const fiber = componentInstance._reactInternal;
        // 超时时间
        const eventTime = performance.now();
        // 任务优先级
        const lane = getLane(fiber);
        const update = createUpdate(eventTime, lane);
        update.payload = payload;  // {number: 1}
        if (callback !== undefined && callback !== null) {
            update.callback = callback;
        }
        fiber.updateQueue.push(update);
        scheduleUpdateOnFiber(fiber, lane, eventTime);
    }
}


/**
 * Component
 */
class Component {
    constructor() {
        this.updater = classComponentUpdater;
    }

    setState(partialState, callback) {
        this.updater.enqueueSetState(this, partialState, callback)
    }
}

export default Component;