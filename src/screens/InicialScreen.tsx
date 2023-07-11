type Props = {
  onMenu(): void;
}

export default function InicialScreen(props: Props) {
  return (
    <>
      <button onClick={props.onMenu}>Iniciar</button>
    </>
  );
}