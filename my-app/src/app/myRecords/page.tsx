import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'user-data.json');

const getData = () => {
  if (!fs.existsSync(dataFilePath)) {
    return { Transactions: { Expenditure: [], Income: [] } };
  }
  const fileData = fs.readFileSync(dataFilePath, 'utf8');
  return JSON.parse(fileData);
};

const MyRecords = () => {
  const data = getData();
  const expenditureItems = data.Transactions.Expenditure;

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Records</CardTitle>
      </CardHeader>
      <CardContent>
        <ul>
          {expenditureItems.map(item => (
            <li key={item.id}>{item.itemName}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default MyRecords;