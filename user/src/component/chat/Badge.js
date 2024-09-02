function Badge({ count, children }) {
    return (
        <div style={{ position: 'relative', display: 'inline-block' }}>
            {children}
            {count > 0 && (
                <span style={{
                    position: 'absolute',
                    top: '-5px',
                    right: '-5px',
                    backgroundColor: 'red',
                    color: 'white',
                    borderRadius: '50%',
                    padding: '2px 5px',
                    fontSize: '10px',
                    fontWeight: 'bold',
                }}>
                    {count}
                </span>
            )}
        </div>
    );
}

export default Badge;
