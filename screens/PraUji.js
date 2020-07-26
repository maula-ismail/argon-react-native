import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Constants from 'expo-constants';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('db6.db');
const table_name = 'mst_kelompok_pra_uji';

function Items({ done: doneHeading, onPressItem }) {
  const [items, setItems] = React.useState(null);

  React.useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'select * from ' + table_name + ' where kode = ?;',
        [doneHeading ? 1 : 0],
        (_, { rows: { _array } }) => setItems(_array),
        (_, { select_error }) =>
          console.log('Gagal select pertama = ' + JSON.stringify(select_error))
      );
    });
  });

  const heading = doneHeading ? 'Completed' : 'Todo';
  console.log(heading);
  if (items === null || items.length === 0) {
    return null;
  }

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionHeading}>{heading}</Text>
      {items.map(({ id_kelompok, kode, nama }) => (
        <TouchableOpacity
          key={id_kelompok}
          onPress={() => onPressItem && onPressItem(id_kelompok)}
          style={{
            backgroundColor: kode ? '#1c9963' : '#fff',
            borderColor: '#000',
            borderWidth: 1,
            padding: 8,
          }}>
          <Text style={{ color: kode ? '#fff' : '#000' }}>{nama}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default function App() {
  const [text, setText] = React.useState(null);
  const [forceUpdate, forceUpdateId] = useForceUpdate();

  React.useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'create table if not exists ' +
          table_name +
          ' (' +
          'id_kelompok integer primary key not null' +
          ', kode int ' +
          ', nama text' +
          ', nama_short` char(20) NOT NULL' +
          ', nama_long` text NOT NULL' +
          ', date_created` text NOT NULL DEFAULT current_timestamp()' +
          ', date_updated` text NOT NULL DEFAULT current_timestamp()' +
          ', is_aktif` tinyint NOT NULL DEFAULT 1' +
          ');',
        [],
        (_, { create_sukses }) =>
          console.log('sukses create table= ' + JSON.stringify(create_sukses)),
        (_, { create_error }) =>
          console.log('gagal create table = ' + JSON.stringify(create_error))
      );
    });
  });

  const add = (text) => {
    // is text empty?
    if (text === null || text === '') {
      return false;
    }

    db.transaction(
      (tx) => {
        tx.executeSql(
          'insert into ' + table_name + ' (kode, nama) values (0, ?)',
          [text],
          (_, { rows }) =>
            console.log('Sukses insert = ' + JSON.stringify(rows)),
          (_, { insert_error }) =>
            console.log('Gagal insert= ' + JSON.stringify(insert_error))
        );
        tx.executeSql(
          'select * from ' + table_name,
          [],
          (_, { rows }) =>
            console.log('Sukses select abis insert = ' + JSON.stringify(rows)),
          (_, { select_error }) =>
            console.log(
              'Gagal select abis insert = ' + JSON.stringify(select_error)
            )
        );
      },
      null,
      forceUpdate
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>SQLite Example</Text>
      <View style={styles.flexRow}>
        <TextInput
          onChangeText={(text) => setText(text)}
          onSubmitEditing={() => {
            add(text);
            setText(null);
          }}
          placeholder="what do you need to do?"
          style={styles.input}
          value={text}
        />
      </View>
      <ScrollView style={styles.listArea}>
        <Items
          key={`forceupdate-todo-${forceUpdateId}`}
          done={false}
          onPressItem={(id_kelompok) =>
            db.transaction(
              (tx) => {
                tx.executeSql(
                  'update ' +
                    table_name +
                    ' set kode = 1 where id_kelompok = ?;',
                  [id_kelompok],
                  (_, { create_sukses }) =>
                    console.log(
                      'sukses update = ' + JSON.stringify(create_sukses)
                    ),
                  (_, { create_error }) =>
                    console.log(
                      'gagal update = ' + JSON.stringify(create_error)
                    )
                );
              },
              null,
              forceUpdate
            )
          }
        />
        <Items
          done
          key={`forceupdate-done-${forceUpdateId}`}
          onPressItem={(id_kelompok) =>
            db.transaction(
              (tx) => {
                tx.executeSql(
                  'delete from ' + table_name + ' where id_kelompok = ?;',
                  [id_kelompok]
                );
              },
              null,
              forceUpdate
            )
          }
        />
      </ScrollView>
    </View>
  );
}

function useForceUpdate() {
  const [value, setValue] = useState(0);
  return [() => setValue(value + 1), value];
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  flexRow: {
    flexDirection: 'row',
  },
  input: {
    borderColor: '#4630eb',
    borderRadius: 4,
    borderWidth: 1,
    flex: 1,
    height: 48,
    margin: 16,
    padding: 8,
  },
  listArea: {
    backgroundColor: '#f0f0f0',
    flex: 1,
    paddingTop: 16,
  },
  sectionContainer: {
    marginBottom: 16,
    marginHorizontal: 16,
  },
  sectionHeading: {
    fontSize: 18,
    marginBottom: 8,
  },
});
