// @function: this method is taken an array and property to group the data based on that and the output should be an object having key as properties and the remaining item specific to that.

export default function groupItems(array, property) {
  return array.reduce(function (groups, item) {
    var name = item[property];
    var group = groups[name] || (groups[name] = []);
    group.push(item);
    return groups;
  }, {});
}
