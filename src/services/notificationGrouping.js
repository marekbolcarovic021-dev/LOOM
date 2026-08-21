const GROUP_WINDOW = 5000;

export function groupNotifications(queue) {
  const groups = [];
  const used = new Set();

  for (let i = 0; i < queue.length; i++) {
    if (used.has(i)) continue;

    const base = queue[i];

    const items = [base];

    for (let j = i + 1; j < queue.length; j++) {
      if (used.has(j)) continue;

      const candidate = queue[j];

      if (!canGroup(base, candidate)) {
        continue;
      }

      items.push(candidate);
      used.add(j);
    }

    if (items.length === 1) {
      groups.push(base);
      continue;
    }

    groups.push(buildGroup(base, items));
  }

  return groups;
}

function canGroup(a, b) {
const entityA =
    a.insight?.entity?.type;

const entityB =
    b.insight?.entity?.type;

if (entityA !== entityB)
    return false;

  if (a.type !== b.type) return false;

  if (a.priority !== b.priority) return false;

  if (
    Math.abs(a.createdAt - b.createdAt) >
    GROUP_WINDOW
  ) {
    return false;
  }

  return true;
}

function buildGroup(base, items) {
  return {
    ...base,

    grouped: true,

    count: items.length,

    items,
  };
}