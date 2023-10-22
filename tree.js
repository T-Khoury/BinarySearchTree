import { Node } from "./node";
function Tree(array) {
    const tree = {
        buildTree(array) {
            let sortedArray = [...new Set(array)].sort((a, b) => a - b);
            if (sortedArray.length === 0) {
                return null
            }
            let mid = Math.floor(sortedArray.length / 2);
            let root = Node(sortedArray[mid]);
            let leftHalf = sortedArray.slice(0, mid);
            let rightHalf = sortedArray.slice(mid + 1);

            root.rightChild = this.buildTree(rightHalf);
            root.leftChild = this.buildTree(leftHalf);

            return root;
        },
        prettyPrint(node, prefix = "", isLeft = true) {
            if (node === null) {
              return;
            }
            if (node.rightChild !== null) {
              this.prettyPrint(node.rightChild, `${prefix}${isLeft ? "│   " : "    "}`, false);
            }
            console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
            if (node.leftChild !== null) {
              this.prettyPrint(node.leftChild, `${prefix}${isLeft ? "    " : "│   "}`, true);
            }
        },
        insert(root, value) {
            
            if (root === null) {
                root = Node(value);
                return root;
            }
            if (value < root.data) {
                root.leftChild = this.insert(root.leftChild, value);
            } else if (value > root.data) {
                root.rightChild = this.insert(root.rightChild, value);
            }
            return root;
        },
        delete(root, value) {
            if (root === null) {
                return root
            }

            if (root.data > value) {
                root.leftChild = this.delete(root.leftChild, value);
                return root
            } else if (root.data < value) {
                root.rightChild = this.delete(root.rightChild, value);
                return root;
            }
            console.log(root);
            if (root.leftChild === null) {
                let temp = root.rightChild;
                console.log(temp);
                delete root;
                return temp;
            } else if (root.rightChild === null) {
                let temp = root.leftChild;
                console.log(temp);
                delete root;
                return temp;
            }

            else {
                let parent = root;
                let replacement = parent.rightChild;

                while (replacement.leftChild !== null) {
                    parent = replacement;
                    replacement = replacement.leftChild;
                }


                if (parent !== root) {
                    parent.leftChild = replacement.rightChild;
                } else {
                    parent.rightChild = replacement.rightChild;
                }

                root.data = replacement.data;

                delete replacement;
                return root;
            }

        },
        find(root, value) {
            if (root.data === value) {
                return root;
            } 
            while ((value < root.data) && (root.leftChild)) {
                root = root.leftChild;
            }
            while ((value > root.data) && (root.rightChild)) {
                root = root.rightChild;
            }
            if (root.data === value) {
                return root;
            } else {
                return 'Value not found in tree'
            }
        },
        levelOrder(root, func) {
            if (!func) {
                func = function(value) {
                    return value
                };
            };
            let results = [];
            let queue = [];
            let result = func(root.data);
            results.push(result);
            if (root.leftChild) {
                queue.push(root.leftChild);
            };
            if (root.rightChild) {
                queue.push(root.rightChild);
            };
            while (queue.length > 0) {
                results.push((func(queue[0].data)))
                if (queue[0].leftChild) {
                    queue.push(queue[0].leftChild);
                }
                if (queue[0].rightChild) {
                    queue.push(queue[0].rightChild);
                }
                queue.splice(0, 1);
            }

            return results;
        },

        inorder(root, results = [], func) {
            if (!func) {
                func = function(value) {
                    return value
                };
            };
            if (root === null) {
                return
            }
            this.inorder(root.leftChild, results, func);
            results.push(func(root.data));
            this.inorder(root.rightChild, results, func);

            return results
        },
        preorder(root, results = [], func) {
            if (!func) {
                func = function(value) {
                    return value
                };
            };
            if (root === null) {
                return
            };
            results.push(func(root.data));
            this.preorder(root.leftChild, results, func);
            this.preorder(root.rightChild, results, func);

            return results

        },
        postorder(root, results = [], func) {
            if (!func) {
                func = function(value) {
                    return value
                };
            };
            if (root === null) {
                return
            };
            this.postorder(root.leftChild, results, func);
            this.postorder(root.rightChild, results, func);
            results.push(func(root.data));

            return results
        }        
    }
    tree.root = tree.buildTree(array)

    
    return tree
}