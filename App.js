import React, { useState, useEffect, useRef } from 'react'
import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import Constants from "expo-constants";
import styled from 'styled-components'
import usePermissions, { availablePermissions } from 'expo-permissions-hooks'

const Screen = ({ navigation }) => {
	const permissions = {}
	for (p of availablePermissions) {
		permissions[p] = usePermissions(p)
	}
  return (
		<ScrollView>
			<Container>
				<Title>{'expo-permissions-hooks'}</Title>
				{availablePermissions.map((p, i) => (
					<React.Fragment key={`item.${i}`}>
						<ListItem>
							<View style={{ flexDirection: 'row' }}>
								<Text style={{ flex: 1 }}>{p}</Text>
								<Text style={{ color: colors[permissions[p].status] }}>{permissions[p].status.toUpperCase()}</Text>
							</View>
							<View style={{ height: 10 }} />
							{permissions[p].isUndetermined && (
								<Button title="Ask permission" onPress={permissions[p].ask} />
							)}
							{(permissions[p].isGranted || permissions[p].isDenied) && (
								<Button title="Change your mind" onPress={permissions[p].goToSettings} />
							)}
						</ListItem>
						{i < availablePermissions.length - 1 && <Separator />}
					</React.Fragment>
				))}
			</Container>
		</ScrollView>
  );
}
Screen.navigationOptions = {
  title: 'expo-permissions-hooks'
}
export default Screen;

const Container = styled.View`
	flex: 1;
	padding-top: ${Constants.statusBarHeight}px
`;

const Title = styled.Text`
	text-align: center;
	margin-top: 5px;
	margin-bottom: 10px;
	font-weight: bold;
	font-size: 18px;
`;

const ListItem = styled.View`
	padding: 15px;
`;

const Separator = styled.View`
	height: ${StyleSheet.hairlineWidth};
	width: 100%;
	background-color: rgba(0, 0, 0, .1);
`

const Button = ({ title, onPress }) => (
	<TouchableOpacity onPress={onPress}>
		<View style={{ height: 40, paddingVertical: 0, paddingHorizontal: 15, alignItems: 'center', justifyContent: 'center', backgroundColor: 'blue' }}>
			<Text style={{ color: 'white' }}>{title}</Text>
		</View>
	</TouchableOpacity>
)

const colors = {
	denied: 'red',
	granted: 'green',
	undetermined: 'rgba(0, 0, 0, .2)'
}
