import Couter from "./Couter";
import { ConcurrentMode, NoMode } from "./ReactTypeofMode";
import { classComponent, HostRoot } from './ReactWorkTags'
import { batchedUpdates } from "./scheduleUpdateOnFiber";

// 18 默认是异步并发模式
// const mode = ConcurrentMode;
// 17
const mode = NoMode;

const CouterInstance = new Couter();

export const RootFiber = {
  tag: HostRoot,
  mode,
  updateQueue: [],
  return: null
};

const CouterFiber = {
  tag: classComponent,
  mode,
  updateQueue: []
};


RootFiber.child = CouterFiber;

CouterFiber.return = RootFiber;

CouterFiber.stateNode = CouterInstance;

CouterInstance._reactInternal = CouterFiber;


// 模拟合成事件
document.getElementById('root').addEventListener('click', (e) => {
  const syntheticEvent = { nativeEvent: e };
  batchedUpdates(() => {
    CouterInstance.addNumber(syntheticEvent);
  });
})