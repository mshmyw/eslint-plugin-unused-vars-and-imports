interface IReportDesc {
    messageId?: string;
    node: {type: 'block'|'line'};
}
interface IContext {
    report: (desc: IReportDesc) => void
}

const context: IContext = {
    report: (descriptor: IReportDesc) => {
        console.log("desc", descriptor.node, descriptor.messageId)
    }
}

/**
 * A custom report function for the baseRule to ignore false positive errors
 * caused by TS-specific codes
 */
const customReport: typeof context.report = descriptor => {
    if ('node' in descriptor) {
        if (
        descriptor.node.type === 'block'
        ) {
        console.log("customReport... ")
        return;
        }
    }
    return context.report(descriptor);
};

export const proxyIntercept = () => {

    const customContext = { report: customReport };

    // we can't directly proxy `context` because its `report` property is non-configurable
    // and non-writable. So we proxy `customContext` and redirect all
    // property access to the original context except for `report`
    const proxiedContext = new Proxy<typeof context>(
        customContext as typeof context,
        {
            get(target, path, receiver): unknown {
            if (path !== 'report') {
                return Reflect.get(context, path, receiver);
            }
            return Reflect.get(target, path, receiver);
            },
        },
    );

    // const ruleCreate = (context: IContext) => {
    //     context.report({
    //         node: {type: 'block'},
    //         messageId: 'hello'
    //     })
    // }

    // ruleCreate(proxiedContext)
    proxiedContext.report({
        node: {type: 'block'},
        messageId: 'hello'
    })
    context.report({
        node: {type: 'block'},
        messageId: 'hello'
    })
}