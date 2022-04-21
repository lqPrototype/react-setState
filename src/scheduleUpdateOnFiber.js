import { classComponent, HostRoot } from "./ReactWorkTags";
import { RootFiber } from './index';
import { ConcurrentMode, NoMode } from "./ReactTypeofMode";

const Queue = []


// 非批量
export const NoContext = /*             */ 0b000;
const BatchedContext = /*               */ 0b001;

let executionContext = NoContext;


const scheduleSyncCallback = (callback) => Queue.push(callback);


/**
 * 调和
 * @param {*} workInProgress 
 */
const performSyncWorkOnRoot = (workInProgress) => {
    const root = workInProgress;
    while (workInProgress) {
        if (workInProgress.tag === classComponent) {
            const instance = workInProgress.stateNode;
            // 根据老状态和新状态进行更新
            instance.state = workInProgress.updateQueue.reduce((pre, { payload }) => ({
                ...pre,
                ...(typeof payload === 'function' ? payload(pre) : payload)
            }), instance.state);
            instance.render();
        }

        workInProgress = workInProgress.child;
    }

    root.callbackPriority = 0
}


/**
 * 调度
 * @param {*} root 
 * @param {*} eventTime 
 * @returns 
 */
const ensureRootIsScheduled = (root, eventTime) => {
    // 获取赛道上面最高的优先级
    const newCallbackPriority = 12;
    const existingCallbackPriority = root?.callbackPriority;
    if (existingCallbackPriority === newCallbackPriority) {
        console.log('调度次数');
        return;
    }

    scheduleSyncCallback(performSyncWorkOnRoot.bind(null, root));

    queueMicrotask(flushSyncCallbackQueue);

    root.callbackPriority = newCallbackPriority;

}

function flushSyncCallbackQueue() {
    Queue.forEach(cb => cb());
    Queue.length = 0;
}

/**
 * 在该fiber上面进行调度更新
 * @param {*} fiber 
 * @param {*} lane 
 * @param {*} eventTime 
 */
const scheduleUpdateOnFiber = (fiber, lane, eventTime) => {
    // 调度
    ensureRootIsScheduled(RootFiber, eventTime);

    if (executionContext === NoContext && (fiber.mode & ConcurrentMode) === NoMode) {
        flushSyncCallbackQueue();
    }

}


/**
 * 批量更新
 * @param {*} fn 
 */
export const batchedUpdates = (fn) => {
    executionContext |= BatchedContext;
    fn();
    executionContext = NoContext;
}

export default scheduleUpdateOnFiber