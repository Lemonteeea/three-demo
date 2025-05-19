type Obj<T = any> = { [key in string | number]: T }

// type Keys<T> = T extends (infer U)[] ? U : T[Extract<keyof T, string>];

type Callback<T extends Obj> = (
  item: T extends (infer U)[] ? U : T[Extract<keyof T, string>],
  index: number,
  source?: T,
) => any

type AsyncCallback<T extends Obj> = (
  item: T extends (infer U)[] ? U : T[Extract<keyof T, string>],
  index: number,
  source?: T,
) => Promise<any>

const isArray = (type: unknown): type is Array<any> => Array.isArray(type)

const isObject = (type: unknown): type is Obj => typeof type === 'object'

/**
 * 同步遍历当前元素
 * @param source 需要遍历的元素
 * @param fn 遍历的同步回调 返回 true 可以停止遍历
 */
export function each<T extends Obj>(source: T, fn: Callback<T>): void {
  if (isArray(source)) {
    for (let i = 0, length = source.length; i < length; i++) {
      if (fn(source[i], i, source) === true)
        return
    }
  }
  else if (isObject(source)) {
    const keys = Reflect.ownKeys(source) as Array<keyof T>
    for (let i = 0, length = keys.length; i < length; i++) {
      const key = keys[i]
      if (Reflect.has(source, key) && key !== 'constructor') {
        if (fn(source[key], i, source) === true)
          return
      }
    }
  }
  else {
    fn(source, -1)
  }
}

/**
 * 倒序遍历
 * @param source 需要遍历的元素
 * @param fn 遍历的同步回调 返回 true 可以停止遍历
 */
export function reverseEach<T extends Obj>(source: T, fn: Callback<T>): void {
  if (isArray(source)) {
    for (let i = source.length - 1; i >= 0; i--) {
      if (fn(source[i], i, source) === true)
        return
    }
  }
  else if (isObject(source)) {
    const keys = Reflect.ownKeys(source) as Array<keyof T>
    for (let i = keys.length - 1; i >= 0; i--) {
      const key = keys[i]
      if (Reflect.has(source, key) && key !== 'constructor') {
        if (fn(source[key], i, source) === true)
          return
      }
    }
  }
  else {
    fn(source, -1)
  }
}

/**
 * 异步遍历当前元素
 * @param source 需要遍历的元素
 * @param fn 遍历的异步回调 返回 true 可以停止遍历
 */
export async function asyncEach<T extends Obj>(source: T, fn: AsyncCallback<T>): Promise<void> {
  if (isArray(source)) {
    for (let i = 0; i < source.length; i++) {
      const result = await fn(source[i], i, source)
      if (result === true)
        return
    }
  }
  else if (isObject(source)) {
    const keys = Reflect.ownKeys(source) as Array<keyof T>
    for (let i = 0, length = keys.length; i < length; i++) {
      const key = keys[i]
      if (Reflect.has(source, key) && key !== 'constructor') {
        const result = await fn(source[key], i, source)
        if (result === true)
          return
      }
    }
  }
  else {
    await fn(source, -1)
  }
}
