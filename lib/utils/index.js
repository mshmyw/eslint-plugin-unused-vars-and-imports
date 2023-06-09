"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.proxyIntercept = exports.hasSideEffect = void 0;
const sideEffectFree = new Set(["Literal", "Identifier", "ThisExpression"]);
/**
 * Check if an expression has side effect.
 * @param {Node} node AST node
 * @returns {boolean} result
 */
function hasSideEffect(node) {
    if (sideEffectFree.has(node.type)) {
        return false;
    }
    if (node.type === "MemberExpression") {
        return hasSideEffect(node.object) || hasSideEffect(node.property);
    }
    if (node.type === "TemplateLiteral") {
        return node.expressions.length !== 0;
    }
    return true;
}
exports.hasSideEffect = hasSideEffect;
const context = {
    report: (descriptor) => {
        console.log("desc", descriptor.node, descriptor.messageId);
    }
};
/**
 * A custom report function for the baseRule to ignore false positive errors
 * caused by TS-specific codes
 */
const customReport = descriptor => {
    if ('node' in descriptor) {
        if (descriptor.node.type === 'block') {
            console.log("customReport... ");
            return;
        }
    }
    return context.report(descriptor);
};
const proxyIntercept = () => {
    const customContext = { report: customReport };
    // we can't directly proxy `context` because its `report` property is non-configurable
    // and non-writable. So we proxy `customContext` and redirect all
    // property access to the original context except for `report`
    const proxiedContext = new Proxy(customContext, {
        get(target, path, receiver) {
            if (path !== 'report') {
                return Reflect.get(context, path, receiver);
            }
            return Reflect.get(target, path, receiver);
        },
    });
    // const ruleCreate = (context: IContext) => {
    //     context.report({
    //         node: {type: 'block'},
    //         messageId: 'hello'
    //     })
    // }
    // ruleCreate(proxiedContext)
    proxiedContext.report({
        node: { type: 'block' },
        messageId: 'hello'
    });
    context.report({
        node: { type: 'block' },
        messageId: 'hello'
    });
};
exports.proxyIntercept = proxyIntercept;
