const getObjectIndex = (source, target) => source.findIndex(
  sourceChild => ((sourceChild.id === target.id)
    && (sourceChild.category === target.category))
);

export default getObjectIndex;
