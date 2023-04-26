"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unusedImportsPredicate = exports.unusedVarsPredicate = void 0;
const _1 = require(".");
const commaFilter = { filter: (token) => token.value === "," };
const includeCommentsFilter = { includeComments: true };
const unusedVarsPredicate = (problem, context) => {
    const { sourceCode } = context;
    const { node } = problem;
    const { parent } = node;
    // If parent is null just let the composed rule handle it
    if (parent == null) {
        return problem;
    }
    // Remove these 3 cases, pass any other trough.
    switch (parent.type) {
        case "ImportSpecifier":
        case "ImportDefaultSpecifier":
        case "ImportNamespaceSpecifier":
            return false;
        case "VariableDeclarator":
            problem.fix = (fixer) => {
                const grandParent = parent.parent;
                if (!grandParent) {
                    return null;
                }
                if (grandParent.declarations.length === 1) {
                    return fixer.remove(grandParent);
                }
                const commaFilter = { filter: (token) => token.value === "," };
                if (parent !== grandParent.declarations[grandParent.declarations.length - 1]) {
                    const comma = sourceCode.getTokenAfter(parent, commaFilter);
                    return [fixer.remove(parent), fixer.remove(comma)];
                }
                return [
                    fixer.remove(sourceCode.getTokenBefore(parent, commaFilter)),
                    fixer.remove(parent)
                ];
            };
            break;
        case "RestElement":
        case "Property":
            problem.fix = (fixer) => {
                const grandParent = parent.parent;
                if (!grandParent) {
                    return null;
                }
                if (!(grandParent && grandParent.type === "ObjectPattern")) {
                    return null;
                }
                if (grandParent.properties.length === 1) {
                    // 为谨慎起见，只有一个属性时不做处理，否则可能引起其他问题
                    return null;
                }
                if (parent === grandParent.properties[grandParent.properties.length - 1]) {
                    const comma = sourceCode.getTokenBefore(parent, commaFilter);
                    return [fixer.remove(parent), fixer.remove(comma)];
                }
                const comma = sourceCode.getTokenAfter(parent, commaFilter);
                return [
                    fixer.remove(parent),
                    fixer.remove(comma)
                ];
            };
            break;
        case "AssignmentPattern":
            problem.fix = (fixer) => {
                if ((0, _1.hasSideEffect)(parent.right)) {
                    return null;
                }
                let grandParent = parent.parent;
                if (!grandParent) {
                    return null;
                }
                let isArray = false;
                switch (grandParent.type) {
                    case 'ArrayPattern':
                        isArray = true;
                        if (grandParent.elements.length === 1) {
                            // 为谨慎起见，只有一个属性时不做处理，否则可能引起其他问题
                            return null;
                        }
                        break;
                    case 'Property':
                        grandParent = grandParent.parent;
                        if (grandParent.type !== 'ObjectPattern' || grandParent.properties.length === 1) {
                            // 为谨慎起见，只有一个属性时不做处理，否则可能引起其他问题
                            return null;
                        }
                        break;
                    default:
                        // 其他非预期行为不处理
                        return null;
                }
                const key = isArray ? 'elements' : 'properties';
                if (parent === grandParent[key][grandParent[key].length - 1]) {
                    const comma = sourceCode.getTokenBefore(parent, commaFilter);
                    return [fixer.remove(parent), fixer.remove(comma)];
                }
                const comma = sourceCode.getTokenAfter(parent, commaFilter);
                return isArray ? [
                    fixer.remove(parent),
                ] : [
                    fixer.remove(parent),
                    fixer.remove(comma)
                ];
            };
            break;
        case "ArrayPattern":
            problem.fix = (fixer) => {
                if (parent.elements.length === 1) {
                    // 为谨慎起见，只有一个属性时不做处理，否则可能引起其他问题
                    return null;
                }
                return fixer.remove(node);
            };
            break;
        default:
            return problem;
    }
    return problem;
};
exports.unusedVarsPredicate = unusedVarsPredicate;
const unusedImportsPredicate = (problem, context) => {
    const { sourceCode } = context;
    const { node } = problem;
    const { parent } = node;
    // If parent is null just let the composed rule handle it
    if (parent == null) {
        return problem;
    }
    // Only handle these 3 cases.
    switch (parent.type) {
        case "ImportSpecifier":
        case "ImportDefaultSpecifier":
        case "ImportNamespaceSpecifier":
            break;
        default:
            return false;
    }
    problem.fix = (fixer) => {
        if (!parent) {
            return null;
        }
        const grandParent = parent.parent;
        if (!grandParent) {
            return null;
        }
        // Only one import
        if (grandParent.specifiers.length === 1) {
            const nextToken = sourceCode.getTokenAfter(grandParent, includeCommentsFilter);
            const newLinesBetween = nextToken ? nextToken.loc.start.line - grandParent.loc.start.line : 0;
            const endOfReplaceRange = nextToken ? nextToken.range[0] : grandParent.range[1];
            const count = Math.max(0, newLinesBetween - 1);
            return [
                fixer.remove(grandParent),
                fixer.replaceTextRange([grandParent.range[1], endOfReplaceRange], "\n".repeat(count)),
            ];
        }
        // Not last specifier
        if (parent !== grandParent.specifiers[grandParent.specifiers.length - 1]) {
            const comma = sourceCode.getTokenAfter(parent, commaFilter);
            const prevNode = sourceCode.getTokenBefore(parent);
            return [
                fixer.removeRange([prevNode.range[1], parent.range[0]]),
                fixer.remove(parent),
                fixer.remove(comma),
            ];
        }
        // Default export and a single normal left, ex. "import default, { package1 } from 'module';"
        if (grandParent.specifiers.filter((specifier) => specifier.type === "ImportSpecifier").length ===
            1) {
            const start = sourceCode.getTokenBefore(parent, commaFilter);
            const end = sourceCode.getTokenAfter(parent, { filter: (token) => token.value === "}" });
            return fixer.removeRange([start.range[0], end.range[1]]);
        }
        return fixer.removeRange([
            sourceCode.getTokenBefore(parent, commaFilter).range[0],
            parent.range[1],
        ]);
    };
    return problem;
};
exports.unusedImportsPredicate = unusedImportsPredicate;
