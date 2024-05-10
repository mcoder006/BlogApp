
const Container = ( { children } : React.PropsWithChildren ) => {
  return (
    <div className="w-full px-4 mx-auto max-w-7xl">
        {children}
    </div>
  );
}

export default Container