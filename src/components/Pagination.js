import React from 'react';

class Pagination extends React.Component {
    render() {
        const { numberOfPages, current, handlePagination } = this.props;
        const activeOlder = (current < numberOfPages) ? ' active' : '';
        const activeNewer = (current > 1) ? ' active' : '';

        return (
        <div className="pagination">
            <button className={`pagination-button${activeOlder}`} onClick={handlePagination} value="older">⇦ Older</button>
            <button className={`pagination-button${activeNewer}`} onClick={handlePagination} value="newer">Newer ⇨</button>
        </div>
        )
    }
}

export default Pagination;