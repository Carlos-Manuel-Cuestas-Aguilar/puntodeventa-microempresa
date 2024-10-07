import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, Button, View, FlatList, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import { apiAxios, route } from '../../apiAxios_route';

export default function HomeScreen() {
  const [proveedores, setProveedores] = useState([]);
  const [editingProveedor, setEditingProveedor] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);

  // Función para obtener proveedores
  function getProveedores() {
    apiAxios.get(route('proveedores.index')).then(response => {
      setProveedores(response.data);
    });
  }

  // Función para Editar proveedores
  function putProveedores(values) {
    apiAxios.put(route('proveedores.update', values.id), values).then(response => {
      setProveedores(proveedores.map(proveedor =>
        proveedor.id === response.data.id ? response.data : proveedor
      ));
      setEditingProveedor(null);
    });
  }

  // Función para Eliminar proveedores
  function deleteProveedores(id) {
    apiAxios.delete(route('proveedores.destroy', id)).then(response => {
      setProveedores(proveedores.filter(p => p.id !== id));
    });
  }

  // Función para cerrar sesión
  function logout() {
    apiAxios.post(route('logout')).then(() => {
      apiAxios.refreshToken();
    });
  }

  useEffect(() => getProveedores(), []);

  // Cálculo de los proveedores a mostrar en la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = proveedores.slice(indexOfFirstItem, indexOfLastItem);

  // Función para cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      {editingProveedor && editingProveedor.id === item.id ? (
        <Formik
          initialValues={{ nombre: editingProveedor.nombre }}
          onSubmit={(values) => putProveedores({ ...editingProveedor, ...values })}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View style={styles.editContainer}>
              <TextInput
                style={styles.input}
                value={values.nombre}
                onChangeText={handleChange('nombre')}
                onBlur={handleBlur('nombre')}
                placeholder="Editar nombre"
                placeholderTextColor="#888"
              />
              <Button onPress={handleSubmit} title="Guardar" color="#4CAF50" />
              <Button onPress={() => setEditingProveedor(null)} title="Cancelar" color="#F44336" />
            </View>
          )}
        </Formik>
      ) : (
        <View style={styles.itemContainer}>
          <View style={styles.column}>
            <Text style={styles.itemText}>{item.nombre}</Text>
          </View>
          <View style={styles.column}>
            <View style={styles.buttonGroup}>
              <Button onPress={() => setEditingProveedor(item)} title="Editar" color="#2196F3" />
              <Button onPress={() => deleteProveedores(item.id)} title="Eliminar" color="#F44336" />
            </View>
          </View>
        </View>
      )}
    </View>
  );

  // Páginas
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(proveedores.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Proveedores</Text>

      {/* Encabezado de la tabla */}
      <View style={styles.tableHeader}>
        <Text style={styles.columnHeader}>Nombre</Text>
        <Text style={styles.columnHeader}>Acciones</Text>
      </View>

      <FlatList
        data={currentItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <View style={styles.pagination}>
        {pageNumbers.map(number => (
          <TouchableOpacity key={number} onPress={() => paginate(number)} style={styles.pageButton}>
            <Text style={styles.pageText}>{number}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.title}>Agregar Proveedor</Text>

      <Formik
        initialValues={{ nombre: "" }}
        onSubmit={async (values, { resetForm }) => {
          apiAxios.post(route('proveedores.store'), values).then(response => {
            setProveedores([...proveedores, response.data]);
            resetForm();
          });
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={styles.formContainer}>
            <Text style={styles.label}>Nombre</Text>
            <TextInput
              style={styles.input}
              value={values.nombre}
              onChangeText={handleChange('nombre')}
              onBlur={handleBlur('nombre')}
              placeholder="Ingresa nombre"
              placeholderTextColor="#888"
            />
            <Button onPress={handleSubmit} title="Crear" color="#4CAF50" />
          </View>
        )}
      </Formik>

{/*<Button onPress={logout} title="Cerrar Sesión" color="#F44336" />*/}
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#e0e0e0',
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  columnHeader: {
    fontWeight: 'bold',
    fontSize: 18,
    flex: 1,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'column',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 5,
    marginVertical: 5,
    padding: 15,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemText: {
    flex: 1,
    marginRight: 10,
    fontSize: 18,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  formContainer: {
    marginVertical: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  column: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  pageButton: {
    marginHorizontal: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#2196F3',
    borderRadius: 5,
  },
  pageText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
