interface Data {
  id: number;
  name: string;
}

interface Props {
  data: Data[];
}

const Test = (props: Props) => {
  const { data } = props;
  return (
    <div>
      <h1>This is only a test component</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus quia
        asperiores in eveniet praesentium facere quod assumenda. Blanditiis,
        nulla delectus.
      </p>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Servicio</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.length > 0 &&
            data.map((row) => (
              <tr>
                <td>{row.id}</td>
                <td>{row.name}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Test;
