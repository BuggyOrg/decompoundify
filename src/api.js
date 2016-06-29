
import * as rewrite from '../lib/const-rewrite.bundle.js'
import {graph as graphAPI} from '@buggyorg/graphtools'

function applyGenericRules (graph) {
  var newGraph = graphAPI.clone(graph)
  var applied = rewrite.rewriteRules[29](newGraph)
  return {graph: newGraph, applied}
}

/**
 * Remove all unnecessary compounds. Necessary compounds are recursion and lambda functions.
 */
export default function (graph) {
  var maxNum = maxNum || graph.nodes().length
  for (var n = 0; n < maxNum; n++) {
    var res = applyGenericRules(graph)
    if (res.applied) {
      graph = res.graph
    } else {
      break
    }
  }
  return graph
}
