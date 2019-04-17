import _ from 'lodash';

export function paginate(pageNumber, pageSize, items) {
    const startIndex = (pageNumber - 1) * pageSize;
    return _(items).slice(startIndex).take(pageSize).value();
}