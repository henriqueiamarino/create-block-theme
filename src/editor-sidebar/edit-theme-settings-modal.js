/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import {
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalHStack as HStack,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalVStack as VStack,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalText as Text,
	BaseControl,
	FlexBlock,
	FormTokenField,
	Modal,
	Button,
	TabPanel,
	PanelBody,
	ToggleControl,
	TextControl,
	SelectControl,
	Dropdown,
	DropdownMenu,
	ColorIndicator,
	ColorPicker,
	CustomGradientPicker,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalItem as Item,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalItemGroup as ItemGroup,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalUnitControl as UnitControl,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalUseNavigator as useNavigator,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalNavigatorProvider as NavigatorProvider,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalNavigatorScreen as NavigatorScreen,
} from '@wordpress/components';
import { plus, moreVertical, lineSolid, chevronRight } from '@wordpress/icons';

const DEFAULT_PRESETS_DEFAULTS = {
	defaultPalette: true,
	defaultGradients: true,
	defaultDuotone: true,
};

const CUSTOM_PRESETS_DEFAULTS = {
	custom: true,
	customGradient: true,
	customDuotone: true,
	link: false,
};

const COLOR_SETTINGS_DEFAULTS = {
	...DEFAULT_PRESETS_DEFAULTS,
	...CUSTOM_PRESETS_DEFAULTS,
};

const ColorSettingsPanel = () => {
	const [ settings, setSettings ] = useState( COLOR_SETTINGS_DEFAULTS );

	const update = ( key ) => ( value ) =>
		setSettings( { ...settings, [ key ]: value } );

	const resetDefaults = () =>
		setSettings( { ...settings, ...DEFAULT_PRESETS_DEFAULTS } );

	const resetCustoms = () =>
		setSettings( { ...settings, ...CUSTOM_PRESETS_DEFAULTS } );

	return (
		<VStack spacing={ 8 }>
			<VStack spacing={ 1 }>
				<HStack justify="space-between" alignment="center">
					<BaseControl.VisualLabel>
						{ __( 'Default presets', 'create-block-theme' ) }
					</BaseControl.VisualLabel>
					<DropdownMenu
						icon={ moreVertical }
						label={ __( 'Options', 'create-block-theme' ) }
						controls={ [
							{
								title: __(
									'Reset default presets',
									'create-block-theme'
								),
								onClick: resetDefaults,
							},
						] }
					/>
				</HStack>
				<VStack spacing={ 3 }>
					<ToggleControl
						__nextHasNoMarginBottom
						label={ __(
							'Default duotone filters',
							'create-block-theme'
						) }
						checked={ settings.defaultDuotone }
						onChange={ update( 'defaultDuotone' ) }
					/>
					<ToggleControl
						__nextHasNoMarginBottom
						label={ __(
							'Default gradients',
							'create-block-theme'
						) }
						checked={ settings.defaultGradients }
						onChange={ update( 'defaultGradients' ) }
					/>
					<ToggleControl
						__nextHasNoMarginBottom
						label={ __( 'Default palette', 'create-block-theme' ) }
						checked={ settings.defaultPalette }
						onChange={ update( 'defaultPalette' ) }
					/>
				</VStack>
			</VStack>
			<VStack spacing={ 1 }>
				<HStack justify="space-between" alignment="center">
					<BaseControl.VisualLabel>
						{ __( 'Custom presets', 'create-block-theme' ) }
					</BaseControl.VisualLabel>
					<DropdownMenu
						icon={ moreVertical }
						label={ __( 'Options', 'create-block-theme' ) }
						controls={ [
							{
								title: __(
									'Reset custom presets',
									'create-block-theme'
								),
								onClick: resetCustoms,
							},
						] }
					/>
				</HStack>
				<VStack spacing={ 3 }>
					<ToggleControl
						__nextHasNoMarginBottom
						label={ __( 'Custom colors', 'create-block-theme' ) }
						checked={ settings.custom }
						onChange={ update( 'custom' ) }
					/>
					<ToggleControl
						__nextHasNoMarginBottom
						label={ __(
							'Custom duotone filters',
							'create-block-theme'
						) }
						checked={ settings.customDuotone }
						onChange={ update( 'customDuotone' ) }
					/>
					<ToggleControl
						__nextHasNoMarginBottom
						label={ __( 'Custom gradients', 'create-block-theme' ) }
						checked={ settings.customGradient }
						onChange={ update( 'customGradient' ) }
					/>
					<ToggleControl
						__nextHasNoMarginBottom
						label={ __( 'Link color', 'create-block-theme' ) }
						help={ __(
							'Enable the link color control.',
							'create-block-theme'
						) }
						checked={ settings.link }
						onChange={ update( 'link' ) }
					/>
				</VStack>
			</VStack>
		</VStack>
	);
};

const PaletteRow = ( { entry, onUpdate, onRemove } ) => (
	<Item className="cbt-palette-list-item">
		<HStack alignment="center" spacing={ 3 }>
			<Dropdown
				popoverProps={ { placement: 'bottom-start' } }
				renderToggle={ ( { onToggle, isOpen } ) => (
					<Button
						onClick={ onToggle }
						aria-expanded={ isOpen }
						label={ __( 'Edit color', 'create-block-theme' ) }
						showTooltip
						className="cbt-palette-swatch-button"
					>
						<ColorIndicator colorValue={ entry.color } />
					</Button>
				) }
				renderContent={ () => (
					<ColorPicker
						color={ entry.color }
						onChange={ ( color ) =>
							onUpdate( { ...entry, color } )
						}
					/>
				) }
			/>
			<FlexBlock>
				<TextControl
					__nextHasNoMarginBottom
					__next40pxDefaultSize
					label={ __( 'Name', 'create-block-theme' ) }
					hideLabelFromVision
					placeholder={ __( 'Name', 'create-block-theme' ) }
					value={ entry.name }
					onChange={ ( name ) => onUpdate( { ...entry, name } ) }
				/>
			</FlexBlock>
			<FlexBlock>
				<TextControl
					__nextHasNoMarginBottom
					__next40pxDefaultSize
					label={ __( 'Slug', 'create-block-theme' ) }
					hideLabelFromVision
					placeholder={ __( 'Slug', 'create-block-theme' ) }
					value={ entry.slug }
					onChange={ ( slug ) => onUpdate( { ...entry, slug } ) }
				/>
			</FlexBlock>
			<Button
				icon={ lineSolid }
				label={ __( 'Remove color', 'create-block-theme' ) }
				onClick={ onRemove }
				className="cbt-palette-swatch-button"
			/>
		</HStack>
	</Item>
);

const PalettePanel = () => {
	const themePalette = useSelect( ( select ) => {
		const theme = select( 'core' ).getCurrentTheme();
		return theme?.theme_json?.settings?.color?.palette;
	}, [] );

	const [ palette, setPalette ] = useState( [] );

	useEffect( () => {
		if ( themePalette ) {
			setPalette( themePalette );
		}
	}, [ themePalette ] );

	const updateEntry = ( index, updated ) =>
		setPalette( palette.map( ( e, i ) => ( i === index ? updated : e ) ) );

	const removeEntry = ( index ) =>
		setPalette( palette.filter( ( _, i ) => i !== index ) );

	const addColor = () =>
		setPalette( [
			...palette,
			{
				slug: `new-color-${ palette.length + 1 }`,
				name: __( 'New color', 'create-block-theme' ),
				color: '#000000',
			},
		] );

	const resetAll = () => setPalette( themePalette || [] );

	return (
		<VStack spacing={ 1 }>
			<HStack
				className="cbt-palette-section-header"
				justify="space-between"
				alignment="center"
			>
				<BaseControl.VisualLabel>
					{ __( 'Color units', 'create-block-theme' ) }
				</BaseControl.VisualLabel>
				<HStack spacing={ 1 } justify="flex-end">
					<Button
						icon={ plus }
						label={ __( 'Add new color', 'create-block-theme' ) }
						onClick={ addColor }
						showTooltip
					/>
					<DropdownMenu
						icon={ moreVertical }
						label={ __( 'Options', 'create-block-theme' ) }
						controls={ [
							{
								title: __(
									'Reset all colors',
									'create-block-theme'
								),
								onClick: resetAll,
							},
						] }
					/>
				</HStack>
			</HStack>
			{ palette.length > 0 && (
				<ItemGroup isBordered isSeparated>
					{ palette.map( ( entry, index ) => (
						<PaletteRow
							key={ index }
							entry={ entry }
							onUpdate={ ( updated ) =>
								updateEntry( index, updated )
							}
							onRemove={ () => removeEntry( index ) }
						/>
					) ) }
				</ItemGroup>
			) }
		</VStack>
	);
};

const GradientRow = ( { entry, onUpdate, onRemove } ) => (
	<Item className="cbt-palette-list-item">
		<HStack alignment="center" spacing={ 3 }>
			<Dropdown
				popoverProps={ {
					placement: 'bottom-start',
					className: 'cbt-gradient-picker-popover',
				} }
				renderToggle={ ( { onToggle, isOpen } ) => (
					<Button
						onClick={ onToggle }
						aria-expanded={ isOpen }
						label={ __( 'Edit gradient', 'create-block-theme' ) }
						showTooltip
						className="cbt-palette-swatch-button"
					>
						<span
							className="cbt-gradient-swatch"
							style={ { background: entry.gradient } }
						/>
					</Button>
				) }
				renderContent={ () => (
					<CustomGradientPicker
						value={ entry.gradient }
						onChange={ ( gradient ) =>
							onUpdate( { ...entry, gradient } )
						}
					/>
				) }
			/>
			<FlexBlock>
				<TextControl
					__nextHasNoMarginBottom
					__next40pxDefaultSize
					label={ __( 'Name', 'create-block-theme' ) }
					hideLabelFromVision
					placeholder={ __( 'Name', 'create-block-theme' ) }
					value={ entry.name }
					onChange={ ( name ) => onUpdate( { ...entry, name } ) }
				/>
			</FlexBlock>
			<FlexBlock>
				<TextControl
					__nextHasNoMarginBottom
					__next40pxDefaultSize
					label={ __( 'Slug', 'create-block-theme' ) }
					hideLabelFromVision
					placeholder={ __( 'Slug', 'create-block-theme' ) }
					value={ entry.slug }
					onChange={ ( slug ) => onUpdate( { ...entry, slug } ) }
				/>
			</FlexBlock>
			<Button
				icon={ lineSolid }
				label={ __( 'Remove gradient', 'create-block-theme' ) }
				onClick={ onRemove }
				className="cbt-palette-swatch-button"
			/>
		</HStack>
	</Item>
);

const GradientPanel = () => {
	const themeGradients = useSelect( ( select ) => {
		const theme = select( 'core' ).getCurrentTheme();
		return theme?.theme_json?.settings?.color?.gradients;
	}, [] );

	const [ gradients, setGradients ] = useState( [] );

	useEffect( () => {
		if ( themeGradients ) {
			setGradients( themeGradients );
		}
	}, [ themeGradients ] );

	const updateEntry = ( index, updated ) =>
		setGradients(
			gradients.map( ( e, i ) => ( i === index ? updated : e ) )
		);

	const removeEntry = ( index ) =>
		setGradients( gradients.filter( ( _, i ) => i !== index ) );

	const addGradient = () =>
		setGradients( [
			...gradients,
			{
				slug: `new-gradient-${ gradients.length + 1 }`,
				name: __( 'New gradient', 'create-block-theme' ),
				gradient:
					'linear-gradient(135deg, rgba(6,147,227,1) 0%, rgb(155,81,224) 100%)',
			},
		] );

	const resetAll = () => setGradients( themeGradients || [] );

	return (
		<VStack spacing={ 1 }>
			<HStack
				className="cbt-palette-section-header"
				justify="space-between"
				alignment="center"
			>
				<BaseControl.VisualLabel>
					{ __( 'Color blends', 'create-block-theme' ) }
				</BaseControl.VisualLabel>
				<HStack spacing={ 1 } justify="flex-end">
					<Button
						icon={ plus }
						label={ __( 'Add new gradient', 'create-block-theme' ) }
						onClick={ addGradient }
						showTooltip
					/>
					<DropdownMenu
						icon={ moreVertical }
						label={ __( 'Options', 'create-block-theme' ) }
						controls={ [
							{
								title: __(
									'Reset all gradients',
									'create-block-theme'
								),
								onClick: resetAll,
							},
						] }
					/>
				</HStack>
			</HStack>
			{ gradients.length > 0 && (
				<ItemGroup isBordered isSeparated>
					{ gradients.map( ( entry, index ) => (
						<GradientRow
							key={ index }
							entry={ entry }
							onUpdate={ ( updated ) =>
								updateEntry( index, updated )
							}
							onRemove={ () => removeEntry( index ) }
						/>
					) ) }
				</ItemGroup>
			) }
		</VStack>
	);
};

const DuotonePickerContent = ( { colors, onUpdateColor } ) => {
	const [ expanded, setExpanded ] = useState( null );

	const toggle = ( which ) =>
		setExpanded( expanded === which ? null : which );

	return (
		<VStack spacing={ 2 }>
			<Button
				onClick={ () => toggle( 'shadows' ) }
				className={ `cbt-duotone-color-row${
					expanded === 'shadows' ? ' is-active' : ''
				}` }
			>
				<HStack spacing={ 3 } alignment="center" justify="flex-start">
					<ColorIndicator colorValue={ colors[ 0 ] } />
					<span>{ __( 'Shadows', 'create-block-theme' ) }</span>
				</HStack>
			</Button>
			{ expanded === 'shadows' && (
				<ColorPicker
					color={ colors[ 0 ] }
					onChange={ ( c ) => onUpdateColor( 0, c ) }
				/>
			) }
			<Button
				onClick={ () => toggle( 'highlights' ) }
				className={ `cbt-duotone-color-row${
					expanded === 'highlights' ? ' is-active' : ''
				}` }
			>
				<HStack spacing={ 3 } alignment="center" justify="flex-start">
					<ColorIndicator colorValue={ colors[ 1 ] } />
					<span>{ __( 'Highlights', 'create-block-theme' ) }</span>
				</HStack>
			</Button>
			{ expanded === 'highlights' && (
				<ColorPicker
					color={ colors[ 1 ] }
					onChange={ ( c ) => onUpdateColor( 1, c ) }
				/>
			) }
		</VStack>
	);
};

const DuotoneRow = ( { entry, onUpdate, onRemove } ) => {
	const colors = entry.colors || [ '#000000', '#ffffff' ];
	const updateColor = ( i, value ) => {
		const next = [ ...colors ];
		next[ i ] = value;
		onUpdate( { ...entry, colors: next } );
	};

	return (
		<Item className="cbt-palette-list-item">
			<HStack alignment="center" spacing={ 3 }>
				<Dropdown
					popoverProps={ {
						placement: 'bottom-start',
						className: 'cbt-duotone-picker-popover',
					} }
					renderToggle={ ( { onToggle, isOpen } ) => (
						<Button
							onClick={ onToggle }
							aria-expanded={ isOpen }
							label={ __( 'Edit duotone', 'create-block-theme' ) }
							showTooltip
							className="cbt-palette-swatch-button"
						>
							<span
								className="cbt-duotone-swatch"
								style={ {
									background: `linear-gradient(135deg, ${ colors[ 0 ] } 50%, ${ colors[ 1 ] } 50%)`,
								} }
							/>
						</Button>
					) }
					renderContent={ () => (
						<DuotonePickerContent
							colors={ colors }
							onUpdateColor={ updateColor }
						/>
					) }
				/>
				<FlexBlock>
					<TextControl
						__nextHasNoMarginBottom
						__next40pxDefaultSize
						label={ __( 'Name', 'create-block-theme' ) }
						hideLabelFromVision
						placeholder={ __( 'Name', 'create-block-theme' ) }
						value={ entry.name }
						onChange={ ( name ) => onUpdate( { ...entry, name } ) }
					/>
				</FlexBlock>
				<FlexBlock>
					<TextControl
						__nextHasNoMarginBottom
						__next40pxDefaultSize
						label={ __( 'Slug', 'create-block-theme' ) }
						hideLabelFromVision
						placeholder={ __( 'Slug', 'create-block-theme' ) }
						value={ entry.slug }
						onChange={ ( slug ) => onUpdate( { ...entry, slug } ) }
					/>
				</FlexBlock>
				<Button
					icon={ lineSolid }
					label={ __( 'Remove duotone', 'create-block-theme' ) }
					onClick={ onRemove }
					className="cbt-palette-swatch-button"
				/>
			</HStack>
		</Item>
	);
};

const DuotonePanel = () => {
	const themeDuotone = useSelect( ( select ) => {
		const theme = select( 'core' ).getCurrentTheme();
		return theme?.theme_json?.settings?.color?.duotone;
	}, [] );

	const [ duotones, setDuotones ] = useState( [] );

	useEffect( () => {
		if ( themeDuotone ) {
			setDuotones( themeDuotone );
		}
	}, [ themeDuotone ] );

	const updateEntry = ( index, updated ) =>
		setDuotones(
			duotones.map( ( e, i ) => ( i === index ? updated : e ) )
		);

	const removeEntry = ( index ) =>
		setDuotones( duotones.filter( ( _, i ) => i !== index ) );

	const addDuotone = () =>
		setDuotones( [
			...duotones,
			{
				slug: `new-duotone-${ duotones.length + 1 }`,
				name: __( 'New duotone', 'create-block-theme' ),
				colors: [ '#000000', '#ffffff' ],
			},
		] );

	const resetAll = () => setDuotones( themeDuotone || [] );

	return (
		<VStack spacing={ 1 }>
			<HStack
				className="cbt-palette-section-header"
				justify="space-between"
				alignment="center"
			>
				<BaseControl.VisualLabel>
					{ __( 'Color filters', 'create-block-theme' ) }
				</BaseControl.VisualLabel>
				<HStack spacing={ 1 } justify="flex-end">
					<Button
						icon={ plus }
						label={ __( 'Add new duotone', 'create-block-theme' ) }
						onClick={ addDuotone }
						showTooltip
					/>
					<DropdownMenu
						icon={ moreVertical }
						label={ __( 'Options', 'create-block-theme' ) }
						controls={ [
							{
								title: __(
									'Reset all duotones',
									'create-block-theme'
								),
								onClick: resetAll,
							},
						] }
					/>
				</HStack>
			</HStack>
			{ duotones.length > 0 && (
				<ItemGroup isBordered isSeparated>
					{ duotones.map( ( entry, index ) => (
						<DuotoneRow
							key={ index }
							entry={ entry }
							onUpdate={ ( updated ) =>
								updateEntry( index, updated )
							}
							onRemove={ () => removeEntry( index ) }
						/>
					) ) }
				</ItemGroup>
			) }
		</VStack>
	);
};

const ColorTab = () => (
	<>
		<PanelBody
			title={ __( 'Color Settings', 'create-block-theme' ) }
			initialOpen
		>
			<ColorSettingsPanel />
		</PanelBody>
		<PanelBody title={ __( 'Palette', 'create-block-theme' ) } initialOpen>
			<PalettePanel />
		</PanelBody>
		<PanelBody
			title={ __( 'Gradients', 'create-block-theme' ) }
			initialOpen
		>
			<GradientPanel />
		</PanelBody>
		<PanelBody title={ __( 'Duotone', 'create-block-theme' ) } initialOpen>
			<DuotonePanel />
		</PanelBody>
	</>
);

const LAYOUT_DEFAULTS = {
	appearanceTools: false,
	useRootPaddingAwareAlignments: false,
	allowEditing: true,
	allowCustomContentAndWideSize: true,
};

const SPACING_DEFAULTS = {
	customSpacingSize: true,
	defaultSpacingSizes: true,
	padding: true,
	margin: true,
	blockGap: true,
};

const TYPOGRAPHY_DEFAULTS = {
	defaultFontSizes: false,
	dropCap: false,
	fluid: false,
};

const LayoutPanel = () => {
	const [ settings, setSettings ] = useState( LAYOUT_DEFAULTS );

	const update = ( key ) => ( value ) =>
		setSettings( { ...settings, [ key ]: value } );

	const resetAll = () => setSettings( LAYOUT_DEFAULTS );

	return (
		<VStack spacing={ 1 }>
			<HStack
				className="cbt-palette-section-header"
				justify="space-between"
				alignment="center"
			>
				<BaseControl.VisualLabel>
					{ __( 'Settings', 'create-block-theme' ) }
				</BaseControl.VisualLabel>
				<DropdownMenu
					icon={ moreVertical }
					label={ __( 'Options', 'create-block-theme' ) }
					controls={ [
						{
							title: __(
								'Reset Layout settings',
								'create-block-theme'
							),
							onClick: resetAll,
						},
					] }
				/>
			</HStack>
			<VStack spacing={ 3 }>
				<ToggleControl
					__nextHasNoMarginBottom
					label={ __( 'Appearance tools', 'create-block-theme' ) }
					help={ __(
						'Enable additional design tools (borders, colors, dimensions) in the block inspector.',
						'create-block-theme'
					) }
					checked={ settings.appearanceTools }
					onChange={ update( 'appearanceTools' ) }
				/>
				<ToggleControl
					__nextHasNoMarginBottom
					label={ __(
						'Root padding-aware alignments',
						'create-block-theme'
					) }
					help={ __(
						'Account for root padding when calculating wide and full alignments.',
						'create-block-theme'
					) }
					checked={ settings.useRootPaddingAwareAlignments }
					onChange={ update( 'useRootPaddingAwareAlignments' ) }
				/>
				<ToggleControl
					__nextHasNoMarginBottom
					label={ __( 'Allow layout editing', 'create-block-theme' ) }
					help={ __(
						'Let users edit layout properties (content width, wide width) in the Editor.',
						'create-block-theme'
					) }
					checked={ settings.allowEditing }
					onChange={ update( 'allowEditing' ) }
				/>
				<ToggleControl
					__nextHasNoMarginBottom
					label={ __(
						'Allow custom content and wide size',
						'create-block-theme'
					) }
					help={ __(
						'Allow custom values for content and wide size beyond the theme defaults.',
						'create-block-theme'
					) }
					checked={ settings.allowCustomContentAndWideSize }
					onChange={ update( 'allowCustomContentAndWideSize' ) }
				/>
			</VStack>
		</VStack>
	);
};

const SpacingSettingsPanel = () => {
	const [ settings, setSettings ] = useState( SPACING_DEFAULTS );

	const update = ( key ) => ( value ) =>
		setSettings( { ...settings, [ key ]: value } );

	const resetAll = () => setSettings( SPACING_DEFAULTS );

	return (
		<VStack spacing={ 1 }>
			<HStack
				className="cbt-palette-section-header"
				justify="space-between"
				alignment="center"
			>
				<BaseControl.VisualLabel>
					{ __( 'Settings', 'create-block-theme' ) }
				</BaseControl.VisualLabel>
				<DropdownMenu
					icon={ moreVertical }
					label={ __( 'Options', 'create-block-theme' ) }
					controls={ [
						{
							title: __(
								'Reset Spacing settings',
								'create-block-theme'
							),
							onClick: resetAll,
						},
					] }
				/>
			</HStack>
			<VStack spacing={ 3 }>
				<ToggleControl
					__nextHasNoMarginBottom
					label={ __( 'Custom spacing size', 'create-block-theme' ) }
					help={ __(
						'Allow users to enter custom spacing values.',
						'create-block-theme'
					) }
					checked={ settings.customSpacingSize }
					onChange={ update( 'customSpacingSize' ) }
				/>
				<ToggleControl
					__nextHasNoMarginBottom
					label={ __(
						'Default spacing sizes',
						'create-block-theme'
					) }
					help={ __(
						'Show the default WordPress spacing presets.',
						'create-block-theme'
					) }
					checked={ settings.defaultSpacingSizes }
					onChange={ update( 'defaultSpacingSizes' ) }
				/>
				<ToggleControl
					__nextHasNoMarginBottom
					label={ __( 'Padding controls', 'create-block-theme' ) }
					help={ __(
						'Enable padding controls in the Editor.',
						'create-block-theme'
					) }
					checked={ settings.padding }
					onChange={ update( 'padding' ) }
				/>
				<ToggleControl
					__nextHasNoMarginBottom
					label={ __( 'Margin controls', 'create-block-theme' ) }
					help={ __(
						'Enable margin controls in the Editor.',
						'create-block-theme'
					) }
					checked={ settings.margin }
					onChange={ update( 'margin' ) }
				/>
				<ToggleControl
					__nextHasNoMarginBottom
					label={ __( 'Block gap controls', 'create-block-theme' ) }
					help={ __(
						'Enable block gap controls in the Editor.',
						'create-block-theme'
					) }
					checked={ settings.blockGap }
					onChange={ update( 'blockGap' ) }
				/>
			</VStack>
		</VStack>
	);
};

const SpacingSizeRow = ( { entry, onUpdate, onRemove } ) => (
	<Item className="cbt-palette-list-item">
		<HStack alignment="center" spacing={ 3 }>
			<FlexBlock>
				<TextControl
					__nextHasNoMarginBottom
					__next40pxDefaultSize
					label={ __( 'Name', 'create-block-theme' ) }
					hideLabelFromVision
					placeholder={ __( 'Name', 'create-block-theme' ) }
					value={ entry.name }
					onChange={ ( name ) => onUpdate( { ...entry, name } ) }
				/>
			</FlexBlock>
			<FlexBlock>
				<TextControl
					__nextHasNoMarginBottom
					__next40pxDefaultSize
					label={ __( 'Slug', 'create-block-theme' ) }
					hideLabelFromVision
					placeholder={ __( 'Slug', 'create-block-theme' ) }
					value={ entry.slug }
					onChange={ ( slug ) => onUpdate( { ...entry, slug } ) }
				/>
			</FlexBlock>
			<FlexBlock>
				<TextControl
					__nextHasNoMarginBottom
					__next40pxDefaultSize
					label={ __( 'Size', 'create-block-theme' ) }
					hideLabelFromVision
					placeholder={ __( 'e.g. 16px', 'create-block-theme' ) }
					value={ entry.size }
					onChange={ ( size ) => onUpdate( { ...entry, size } ) }
				/>
			</FlexBlock>
			<Button
				icon={ lineSolid }
				label={ __( 'Remove size', 'create-block-theme' ) }
				onClick={ onRemove }
				className="cbt-palette-swatch-button"
			/>
		</HStack>
	</Item>
);

const SpacingPresetsPanel = () => {
	const themeSpacingSizes = useSelect( ( select ) => {
		const theme = select( 'core' ).getCurrentTheme();
		return theme?.theme_json?.settings?.spacing?.spacingSizes;
	}, [] );

	const [ sizes, setSizes ] = useState( [] );

	useEffect( () => {
		if ( themeSpacingSizes ) {
			setSizes( themeSpacingSizes );
		}
	}, [ themeSpacingSizes ] );

	const updateEntry = ( index, updated ) =>
		setSizes( sizes.map( ( e, i ) => ( i === index ? updated : e ) ) );

	const removeEntry = ( index ) =>
		setSizes( sizes.filter( ( _, i ) => i !== index ) );

	const addSize = () =>
		setSizes( [
			...sizes,
			{
				slug: `new-size-${ sizes.length + 1 }`,
				name: __( 'New size', 'create-block-theme' ),
				size: '16px',
			},
		] );

	const resetAll = () => setSizes( themeSpacingSizes || [] );

	return (
		<VStack spacing={ 1 }>
			<HStack
				className="cbt-palette-section-header"
				justify="space-between"
				alignment="center"
			>
				<BaseControl.VisualLabel>
					{ __( 'Spacing sizes', 'create-block-theme' ) }
				</BaseControl.VisualLabel>
				<HStack spacing={ 1 } justify="flex-end">
					<Button
						icon={ plus }
						label={ __( 'Add new size', 'create-block-theme' ) }
						onClick={ addSize }
						showTooltip
					/>
					<DropdownMenu
						icon={ moreVertical }
						label={ __( 'Options', 'create-block-theme' ) }
						controls={ [
							{
								title: __(
									'Reset all sizes',
									'create-block-theme'
								),
								onClick: resetAll,
							},
						] }
					/>
				</HStack>
			</HStack>
			{ sizes.length > 0 && (
				<ItemGroup isBordered isSeparated>
					{ sizes.map( ( entry, index ) => (
						<SpacingSizeRow
							key={ index }
							entry={ entry }
							onUpdate={ ( updated ) =>
								updateEntry( index, updated )
							}
							onRemove={ () => removeEntry( index ) }
						/>
					) ) }
				</ItemGroup>
			) }
		</VStack>
	);
};

const UNIT_SUGGESTIONS = [
	'px',
	'em',
	'rem',
	'%',
	'vh',
	'vw',
	'vmin',
	'vmax',
	'ch',
	'ex',
];

const SpacingUnitsPanel = () => {
	const themeUnits = useSelect( ( select ) => {
		const theme = select( 'core' ).getCurrentTheme();
		return theme?.theme_json?.settings?.spacing?.units;
	}, [] );

	const [ units, setUnits ] = useState( [] );

	useEffect( () => {
		if ( themeUnits ) {
			setUnits( themeUnits );
		}
	}, [ themeUnits ] );

	return (
		<FormTokenField
			__nextHasNoMarginBottom
			__next40pxDefaultSize
			label={ __( 'CSS units', 'create-block-theme' ) }
			hideLabelFromVision
			value={ units }
			suggestions={ UNIT_SUGGESTIONS }
			onChange={ setUnits }
		/>
	);
};

const DimensionsTab = () => (
	<>
		<PanelBody title={ __( 'Layout', 'create-block-theme' ) } initialOpen>
			<LayoutPanel />
		</PanelBody>
		<PanelBody title={ __( 'Spacing', 'create-block-theme' ) } initialOpen>
			<SpacingSettingsPanel />
		</PanelBody>
		<PanelBody title={ __( 'Sizes', 'create-block-theme' ) } initialOpen>
			<SpacingPresetsPanel />
		</PanelBody>
		<PanelBody title={ __( 'Units', 'create-block-theme' ) } initialOpen>
			<SpacingUnitsPanel />
		</PanelBody>
	</>
);

const TypographySettingsPanel = () => {
	const [ settings, setSettings ] = useState( TYPOGRAPHY_DEFAULTS );

	const update = ( key ) => ( value ) =>
		setSettings( { ...settings, [ key ]: value } );

	const resetAll = () => setSettings( TYPOGRAPHY_DEFAULTS );

	return (
		<VStack spacing={ 1 }>
			<HStack
				className="cbt-palette-section-header"
				justify="space-between"
				alignment="center"
			>
				<BaseControl.VisualLabel>
					{ __( 'Font Presets', 'create-block-theme' ) }
				</BaseControl.VisualLabel>
				<DropdownMenu
					icon={ moreVertical }
					label={ __( 'Options', 'create-block-theme' ) }
					controls={ [
						{
							title: __(
								'Reset Typography settings',
								'create-block-theme'
							),
							onClick: resetAll,
						},
					] }
				/>
			</HStack>
			<VStack spacing={ 3 }>
				<ToggleControl
					__nextHasNoMarginBottom
					label={ __( 'Default font sizes', 'create-block-theme' ) }
					help={ __(
						'Show the default WordPress font size presets.',
						'create-block-theme'
					) }
					checked={ settings.defaultFontSizes }
					onChange={ update( 'defaultFontSizes' ) }
				/>
				<ToggleControl
					__nextHasNoMarginBottom
					label={ __( 'Drop cap', 'create-block-theme' ) }
					help={ __(
						'Enable drop caps for paragraphs.',
						'create-block-theme'
					) }
					checked={ settings.dropCap }
					onChange={ update( 'dropCap' ) }
				/>
				<ToggleControl
					__nextHasNoMarginBottom
					label={ __( 'Fluid typography', 'create-block-theme' ) }
					help={ __(
						'Scale font sizes based on viewport width.',
						'create-block-theme'
					) }
					checked={ Boolean( settings.fluid ) }
					onChange={ update( 'fluid' ) }
				/>
			</VStack>
		</VStack>
	);
};

const FONT_FAMILY_TYPES = [
	{ label: '', value: '' },
	{ label: 'Serif', value: 'serif' },
	{ label: 'Sans-serif', value: 'sans-serif' },
	{ label: 'Monospace', value: 'monospace' },
	{ label: 'Cursive', value: 'cursive' },
	{ label: 'Fantasy', value: 'fantasy' },
	{ label: 'System UI', value: 'system-ui' },
];

const FONT_WEIGHTS = [
	{ label: 'Thin', value: '100' },
	{ label: 'Extra Light', value: '200' },
	{ label: 'Light', value: '300' },
	{ label: 'Regular', value: '400' },
	{ label: 'Medium', value: '500' },
	{ label: 'Semibold', value: '600' },
	{ label: 'Bold', value: '700' },
	{ label: 'Extra Bold', value: '800' },
	{ label: 'Black', value: '900' },
];

const FONT_STYLES = [
	{ label: 'Normal', value: 'normal' },
	{ label: 'Italic', value: 'italic' },
	{ label: 'Oblique', value: 'oblique' },
];

const getFontType = ( fontFamily ) => {
	if ( ! fontFamily ) {
		return '';
	}
	const parts = fontFamily.split( ',' ).map( ( s ) => s.trim() );
	const last = parts[ parts.length - 1 ] || '';
	return FONT_FAMILY_TYPES.some( ( t ) => t.value === last ) ? last : '';
};

const setFontType = ( fontFamily, name, newType ) => {
	const fallback = newType || '';
	const baseRaw =
		fontFamily && fontFamily.includes( ',' )
			? fontFamily.split( ',' )[ 0 ].trim()
			: fontFamily || name || '';
	if ( ! fallback ) {
		return baseRaw;
	}
	return baseRaw ? `${ baseRaw }, ${ fallback }` : fallback;
};

const FontFamilyListItem = ( { entry, index, onUpdate } ) => {
	const navigator = useNavigator();
	const type = getFontType( entry.fontFamily );

	return (
		<Item className="cbt-palette-list-item">
			<HStack alignment="center" spacing={ 3 }>
				<FlexBlock>
					<TextControl
						__nextHasNoMarginBottom
						__next40pxDefaultSize
						label={ __( 'Name', 'create-block-theme' ) }
						hideLabelFromVision
						placeholder={ __( 'Name', 'create-block-theme' ) }
						value={ entry.name || '' }
						onChange={ ( name ) => onUpdate( { ...entry, name } ) }
					/>
				</FlexBlock>
				<FlexBlock>
					<TextControl
						__nextHasNoMarginBottom
						__next40pxDefaultSize
						label={ __( 'Slug', 'create-block-theme' ) }
						hideLabelFromVision
						placeholder={ __( 'Slug', 'create-block-theme' ) }
						value={ entry.slug || '' }
						onChange={ ( slug ) => onUpdate( { ...entry, slug } ) }
					/>
				</FlexBlock>
				<FlexBlock>
					<SelectControl
						__nextHasNoMarginBottom
						__next40pxDefaultSize
						label={ __( 'Type', 'create-block-theme' ) }
						hideLabelFromVision
						value={ type }
						options={ FONT_FAMILY_TYPES }
						onChange={ ( newType ) =>
							onUpdate( {
								...entry,
								fontFamily: setFontType(
									entry.fontFamily,
									entry.name,
									newType
								),
							} )
						}
					/>
				</FlexBlock>
				<Button
					icon={ chevronRight }
					label={ __( 'Edit font faces', 'create-block-theme' ) }
					onClick={ () => navigator.goTo( `/edit/${ index }` ) }
					className="cbt-palette-swatch-button"
				/>
			</HStack>
		</Item>
	);
};

const FontFaceRow = ( { face, onUpdate, onRemove } ) => (
	<Item className="cbt-palette-list-item">
		<HStack alignment="center" spacing={ 3 }>
			<FlexBlock>
				<SelectControl
					__nextHasNoMarginBottom
					__next40pxDefaultSize
					label={ __( 'Weight', 'create-block-theme' ) }
					hideLabelFromVision
					value={ String( face.fontWeight || '' ) }
					options={ FONT_WEIGHTS }
					onChange={ ( fontWeight ) =>
						onUpdate( { ...face, fontWeight } )
					}
				/>
			</FlexBlock>
			<FlexBlock>
				<TextControl
					__nextHasNoMarginBottom
					__next40pxDefaultSize
					label={ __( 'Source', 'create-block-theme' ) }
					hideLabelFromVision
					placeholder={ __(
						'file:./assets/fonts/…',
						'create-block-theme'
					) }
					value={
						Array.isArray( face.src )
							? face.src[ 0 ] || ''
							: face.src || ''
					}
					onChange={ ( srcValue ) =>
						onUpdate( { ...face, src: [ srcValue ] } )
					}
				/>
			</FlexBlock>
			<FlexBlock>
				<SelectControl
					__nextHasNoMarginBottom
					__next40pxDefaultSize
					label={ __( 'Style', 'create-block-theme' ) }
					hideLabelFromVision
					value={ face.fontStyle || '' }
					options={ FONT_STYLES }
					onChange={ ( fontStyle ) =>
						onUpdate( { ...face, fontStyle } )
					}
				/>
			</FlexBlock>
			<Button
				icon={ lineSolid }
				label={ __( 'Remove font face', 'create-block-theme' ) }
				onClick={ onRemove }
				className="cbt-palette-swatch-button"
			/>
		</HStack>
	</Item>
);

const FontFamilyList = ( { families, onAdd, onUpdate } ) => (
	<VStack spacing={ 1 }>
		<HStack
			className="cbt-palette-section-header"
			justify="space-between"
			alignment="center"
		>
			<BaseControl.VisualLabel>
				{ __( 'Font families', 'create-block-theme' ) }
			</BaseControl.VisualLabel>
			<HStack spacing={ 1 } justify="flex-end">
				<Button
					icon={ plus }
					label={ __( 'Add new family', 'create-block-theme' ) }
					onClick={ onAdd }
					showTooltip
				/>
				<DropdownMenu
					icon={ moreVertical }
					label={ __( 'Options', 'create-block-theme' ) }
					controls={ [
						{
							title: __(
								'Reset all families',
								'create-block-theme'
							),
							onClick: () => {},
						},
					] }
				/>
			</HStack>
		</HStack>
		{ families.length > 0 && (
			<ItemGroup isBordered isSeparated>
				{ families.map( ( entry, index ) => (
					<FontFamilyListItem
						key={ index }
						entry={ entry }
						index={ index }
						onUpdate={ ( updated ) => onUpdate( index, updated ) }
					/>
				) ) }
			</ItemGroup>
		) }
	</VStack>
);

const FontFamilyEditor = ( { families, onUpdate, onRemove } ) => {
	const { params, goBack } = useNavigator();
	const index = parseInt( params.index, 10 );
	const entry = families[ index ];

	if ( ! entry ) {
		return null;
	}

	const fontFaces = entry.fontFace || [];

	const updateFace = ( faceIndex, updated ) => {
		const newFaces = fontFaces.map( ( f, i ) =>
			i === faceIndex ? updated : f
		);
		onUpdate( index, { ...entry, fontFace: newFaces } );
	};

	const removeFace = ( faceIndex ) => {
		const newFaces = fontFaces.filter( ( _, i ) => i !== faceIndex );
		onUpdate( index, { ...entry, fontFace: newFaces } );
	};

	const removeFamily = () => {
		onRemove( index );
		goBack();
	};

	const addFace = () => {
		const newFaces = [
			...fontFaces,
			{
				fontFamily: entry.name || '',
				fontWeight: '400',
				fontStyle: 'normal',
				src: [ '' ],
			},
		];
		onUpdate( index, { ...entry, fontFace: newFaces } );
	};

	const type = getFontType( entry.fontFamily );

	return (
		<VStack spacing={ 1 }>
			<HStack
				className="cbt-palette-section-header"
				justify="space-between"
				alignment="center"
			>
				<BaseControl.VisualLabel>
					{ __( 'Font family entries', 'create-block-theme' ) }
				</BaseControl.VisualLabel>
				<HStack spacing={ 1 } justify="flex-end">
					<Button
						icon={ plus }
						label={ __( 'Add font face', 'create-block-theme' ) }
						onClick={ addFace }
						showTooltip
					/>
					<Button variant="link" onClick={ () => goBack() }>
						{ __( 'Done', 'create-block-theme' ) }
					</Button>
				</HStack>
			</HStack>
			<ItemGroup isBordered isSeparated>
				<Item className="cbt-palette-list-item">
					<HStack alignment="center" spacing={ 3 }>
						<FlexBlock>{ entry.name }</FlexBlock>
						<FlexBlock>{ entry.slug }</FlexBlock>
						<FlexBlock>
							{ FONT_FAMILY_TYPES.find(
								( t ) => t.value === type
							)?.label || '' }
						</FlexBlock>
						<Button
							icon={ lineSolid }
							label={ __(
								'Remove font family',
								'create-block-theme'
							) }
							onClick={ removeFamily }
							className="cbt-palette-swatch-button"
						/>
					</HStack>
				</Item>
				{ fontFaces.map( ( face, faceIndex ) => (
					<FontFaceRow
						key={ faceIndex }
						face={ face }
						onUpdate={ ( updated ) =>
							updateFace( faceIndex, updated )
						}
						onRemove={ () => removeFace( faceIndex ) }
					/>
				) ) }
			</ItemGroup>
		</VStack>
	);
};

const FontFamiliesPanel = () => {
	const themeFamilies = useSelect( ( select ) => {
		const theme = select( 'core' ).getCurrentTheme();
		return theme?.theme_json?.settings?.typography?.fontFamilies;
	}, [] );

	const [ families, setFamilies ] = useState( [] );

	useEffect( () => {
		if ( themeFamilies ) {
			setFamilies( themeFamilies );
		}
	}, [ themeFamilies ] );

	const updateEntry = ( index, updated ) =>
		setFamilies(
			families.map( ( e, i ) => ( i === index ? updated : e ) )
		);

	const removeEntry = ( index ) =>
		setFamilies( families.filter( ( _, i ) => i !== index ) );

	const addFamily = () =>
		setFamilies( [
			...families,
			{
				slug: `new-family-${ families.length + 1 }`,
				name: __( 'New family', 'create-block-theme' ),
				fontFamily: '',
			},
		] );

	return (
		<NavigatorProvider initialPath="/">
			<NavigatorScreen path="/">
				<FontFamilyList
					families={ families }
					onAdd={ addFamily }
					onUpdate={ updateEntry }
				/>
			</NavigatorScreen>
			<NavigatorScreen path="/edit/:index">
				<FontFamilyEditor
					families={ families }
					onUpdate={ updateEntry }
					onRemove={ removeEntry }
				/>
			</NavigatorScreen>
		</NavigatorProvider>
	);
};

const FontSizeRow = ( { entry, onUpdate, onRemove } ) => (
	<Item className="cbt-palette-list-item">
		<HStack alignment="center" spacing={ 3 }>
			<FlexBlock>
				<TextControl
					__nextHasNoMarginBottom
					__next40pxDefaultSize
					label={ __( 'Name', 'create-block-theme' ) }
					hideLabelFromVision
					placeholder={ __( 'Name', 'create-block-theme' ) }
					value={ entry.name || '' }
					onChange={ ( name ) => onUpdate( { ...entry, name } ) }
				/>
			</FlexBlock>
			<FlexBlock>
				<TextControl
					__nextHasNoMarginBottom
					__next40pxDefaultSize
					label={ __( 'Slug', 'create-block-theme' ) }
					hideLabelFromVision
					placeholder={ __( 'Slug', 'create-block-theme' ) }
					value={ entry.slug || '' }
					onChange={ ( slug ) => onUpdate( { ...entry, slug } ) }
				/>
			</FlexBlock>
			<FlexBlock>
				<UnitControl
					__nextHasNoMarginBottom
					__next40pxDefaultSize
					label={ __( 'Size', 'create-block-theme' ) }
					hideLabelFromVision
					value={ entry.size || '' }
					onChange={ ( size ) => onUpdate( { ...entry, size } ) }
				/>
			</FlexBlock>
			<Button
				icon={ lineSolid }
				label={ __( 'Remove font size', 'create-block-theme' ) }
				onClick={ onRemove }
				className="cbt-palette-swatch-button"
			/>
		</HStack>
	</Item>
);

const FontSizesPanel = () => {
	const themeFontSizes = useSelect( ( select ) => {
		const theme = select( 'core' ).getCurrentTheme();
		return theme?.theme_json?.settings?.typography?.fontSizes;
	}, [] );

	const [ sizes, setSizes ] = useState( [] );

	useEffect( () => {
		if ( themeFontSizes ) {
			setSizes( themeFontSizes );
		}
	}, [ themeFontSizes ] );

	const updateEntry = ( index, updated ) =>
		setSizes( sizes.map( ( e, i ) => ( i === index ? updated : e ) ) );

	const removeEntry = ( index ) =>
		setSizes( sizes.filter( ( _, i ) => i !== index ) );

	const addSize = () =>
		setSizes( [
			...sizes,
			{
				slug: `new-size-${ sizes.length + 1 }`,
				name: __( 'New size', 'create-block-theme' ),
				size: '16px',
			},
		] );

	const resetAll = () => setSizes( themeFontSizes || [] );

	return (
		<VStack spacing={ 1 }>
			<HStack
				className="cbt-palette-section-header"
				justify="space-between"
				alignment="center"
			>
				<BaseControl.VisualLabel>
					{ __( 'Font sizes', 'create-block-theme' ) }
				</BaseControl.VisualLabel>
				<HStack spacing={ 1 } justify="flex-end">
					<Button
						icon={ plus }
						label={ __( 'Add new size', 'create-block-theme' ) }
						onClick={ addSize }
						showTooltip
					/>
					<DropdownMenu
						icon={ moreVertical }
						label={ __( 'Options', 'create-block-theme' ) }
						controls={ [
							{
								title: __(
									'Reset all sizes',
									'create-block-theme'
								),
								onClick: resetAll,
							},
						] }
					/>
				</HStack>
			</HStack>
			{ sizes.length > 0 && (
				<ItemGroup isBordered isSeparated>
					{ sizes.map( ( entry, index ) => (
						<FontSizeRow
							key={ index }
							entry={ entry }
							onUpdate={ ( updated ) =>
								updateEntry( index, updated )
							}
							onRemove={ () => removeEntry( index ) }
						/>
					) ) }
				</ItemGroup>
			) }
		</VStack>
	);
};

const TEMPLATE_PART_AREAS = [
	{ label: 'Header', value: 'header' },
	{ label: 'Footer', value: 'footer' },
	{ label: 'Sidebar', value: 'sidebar' },
	{ label: 'Uncategorized', value: 'uncategorized' },
];

const TemplatePartRow = ( { entry, onUpdate, onRemove } ) => (
	<Item className="cbt-palette-list-item">
		<HStack alignment="center" spacing={ 3 }>
			<FlexBlock>
				<SelectControl
					__nextHasNoMarginBottom
					__next40pxDefaultSize
					label={ __( 'Area', 'create-block-theme' ) }
					hideLabelFromVision
					value={ entry.area || 'uncategorized' }
					options={ TEMPLATE_PART_AREAS }
					onChange={ ( area ) => onUpdate( { ...entry, area } ) }
				/>
			</FlexBlock>
			<FlexBlock>
				<TextControl
					__nextHasNoMarginBottom
					__next40pxDefaultSize
					label={ __( 'Name', 'create-block-theme' ) }
					hideLabelFromVision
					placeholder={ __( 'Name (slug)', 'create-block-theme' ) }
					value={ entry.name || '' }
					onChange={ ( name ) => onUpdate( { ...entry, name } ) }
				/>
			</FlexBlock>
			<FlexBlock>
				<TextControl
					__nextHasNoMarginBottom
					__next40pxDefaultSize
					label={ __( 'Title', 'create-block-theme' ) }
					hideLabelFromVision
					placeholder={ __( 'Display title', 'create-block-theme' ) }
					value={ entry.title || '' }
					onChange={ ( title ) => onUpdate( { ...entry, title } ) }
				/>
			</FlexBlock>
			<Button
				icon={ lineSolid }
				label={ __( 'Remove template part', 'create-block-theme' ) }
				onClick={ onRemove }
				className="cbt-palette-swatch-button"
			/>
		</HStack>
	</Item>
);

const TemplatePartsPanel = () => {
	const themeParts = useSelect( ( select ) => {
		const theme = select( 'core' ).getCurrentTheme();
		return theme?.theme_json?.templateParts;
	}, [] );

	const [ parts, setParts ] = useState( [] );

	useEffect( () => {
		if ( themeParts ) {
			setParts( themeParts );
		}
	}, [ themeParts ] );

	const updateEntry = ( index, updated ) =>
		setParts( parts.map( ( e, i ) => ( i === index ? updated : e ) ) );

	const removeEntry = ( index ) =>
		setParts( parts.filter( ( _, i ) => i !== index ) );

	const addPart = () =>
		setParts( [
			...parts,
			{
				name: `new-part-${ parts.length + 1 }`,
				title: __( 'New Template Part', 'create-block-theme' ),
				area: 'uncategorized',
			},
		] );

	const resetAll = () => setParts( themeParts || [] );

	return (
		<VStack spacing={ 4 }>
			<Text>
				{ __(
					'Template Parts are reusable sections of a theme such as headers, footers, and sidebars. Each part registered here can be edited visually in the Site Editor.',
					'create-block-theme'
				) }
			</Text>
			<VStack spacing={ 1 }>
				<HStack
					className="cbt-palette-section-header"
					justify="space-between"
					alignment="center"
				>
					<BaseControl.VisualLabel>
						{ __( 'Template parts', 'create-block-theme' ) }
					</BaseControl.VisualLabel>
					<HStack spacing={ 1 } justify="flex-end">
						<Button
							icon={ plus }
							label={ __(
								'Add new template part',
								'create-block-theme'
							) }
							onClick={ addPart }
							showTooltip
						/>
						<DropdownMenu
							icon={ moreVertical }
							label={ __( 'Options', 'create-block-theme' ) }
							controls={ [
								{
									title: __(
										'Reset all template parts',
										'create-block-theme'
									),
									onClick: resetAll,
								},
							] }
						/>
					</HStack>
				</HStack>
				{ parts.length > 0 && (
					<ItemGroup isBordered isSeparated>
						{ parts.map( ( entry, index ) => (
							<TemplatePartRow
								key={ index }
								entry={ entry }
								onUpdate={ ( updated ) =>
									updateEntry( index, updated )
								}
								onRemove={ () => removeEntry( index ) }
							/>
						) ) }
					</ItemGroup>
				) }
			</VStack>
		</VStack>
	);
};

const POST_TYPE_SUGGESTIONS = [ 'page', 'post' ];

const CustomTemplateRow = ( { entry, onUpdate, onRemove } ) => (
	<Item className="cbt-palette-list-item">
		<HStack alignment="center" spacing={ 3 }>
			<FlexBlock>
				<TextControl
					__nextHasNoMarginBottom
					__next40pxDefaultSize
					label={ __( 'Name', 'create-block-theme' ) }
					hideLabelFromVision
					placeholder={ __( 'Name (slug)', 'create-block-theme' ) }
					value={ entry.name || '' }
					onChange={ ( name ) => onUpdate( { ...entry, name } ) }
				/>
			</FlexBlock>
			<FlexBlock>
				<TextControl
					__nextHasNoMarginBottom
					__next40pxDefaultSize
					label={ __( 'Title', 'create-block-theme' ) }
					hideLabelFromVision
					placeholder={ __( 'Display title', 'create-block-theme' ) }
					value={ entry.title || '' }
					onChange={ ( title ) => onUpdate( { ...entry, title } ) }
				/>
			</FlexBlock>
			<FlexBlock>
				<FormTokenField
					__nextHasNoMarginBottom
					__next40pxDefaultSize
					__experimentalShowHowTo={ false }
					label={ __( 'Post types', 'create-block-theme' ) }
					hideLabelFromVision
					value={ entry.postTypes || [] }
					suggestions={ POST_TYPE_SUGGESTIONS }
					onChange={ ( postTypes ) =>
						onUpdate( { ...entry, postTypes } )
					}
				/>
			</FlexBlock>
			<Button
				icon={ lineSolid }
				label={ __( 'Remove custom template', 'create-block-theme' ) }
				onClick={ onRemove }
				className="cbt-palette-swatch-button"
			/>
		</HStack>
	</Item>
);

const CustomTemplatesPanel = () => {
	const themeTemplates = useSelect( ( select ) => {
		const theme = select( 'core' ).getCurrentTheme();
		return theme?.theme_json?.customTemplates;
	}, [] );

	const [ templates, setTemplates ] = useState( [] );

	useEffect( () => {
		if ( themeTemplates ) {
			setTemplates( themeTemplates );
		}
	}, [ themeTemplates ] );

	const updateEntry = ( index, updated ) =>
		setTemplates(
			templates.map( ( e, i ) => ( i === index ? updated : e ) )
		);

	const removeEntry = ( index ) =>
		setTemplates( templates.filter( ( _, i ) => i !== index ) );

	const addTemplate = () =>
		setTemplates( [
			...templates,
			{
				name: `new-template-${ templates.length + 1 }`,
				title: __( 'New Template', 'create-block-theme' ),
				postTypes: [ 'page' ],
			},
		] );

	const resetAll = () => setTemplates( themeTemplates || [] );

	return (
		<VStack spacing={ 4 }>
			<Text>
				{ __(
					'Custom Templates are alternative page layouts users can select when editing a post or page. Each template registered here matches a file in your theme’s templates/ folder.',
					'create-block-theme'
				) }
			</Text>
			<VStack spacing={ 1 }>
				<HStack
					className="cbt-palette-section-header"
					justify="space-between"
					alignment="center"
				>
					<BaseControl.VisualLabel>
						{ __( 'Custom templates', 'create-block-theme' ) }
					</BaseControl.VisualLabel>
					<HStack spacing={ 1 } justify="flex-end">
						<Button
							icon={ plus }
							label={ __(
								'Add new custom template',
								'create-block-theme'
							) }
							onClick={ addTemplate }
							showTooltip
						/>
						<DropdownMenu
							icon={ moreVertical }
							label={ __( 'Options', 'create-block-theme' ) }
							controls={ [
								{
									title: __(
										'Reset all custom templates',
										'create-block-theme'
									),
									onClick: resetAll,
								},
							] }
						/>
					</HStack>
				</HStack>
				{ templates.length > 0 && (
					<ItemGroup isBordered isSeparated>
						{ templates.map( ( entry, index ) => (
							<CustomTemplateRow
								key={ index }
								entry={ entry }
								onUpdate={ ( updated ) =>
									updateEntry( index, updated )
								}
								onRemove={ () => removeEntry( index ) }
							/>
						) ) }
					</ItemGroup>
				) }
			</VStack>
		</VStack>
	);
};

const CORE_SHADOW_DEFAULTS = [
	{ slug: 'natural', name: 'Natural' },
	{ slug: 'deep', name: 'Deep' },
	{ slug: 'sharp', name: 'Sharp' },
	{ slug: 'outlined', name: 'Outlined' },
	{ slug: 'crisp', name: 'Crisp' },
];

const ShadowRow = ( { name, onRemove } ) => (
	<Item className="cbt-palette-list-item">
		<HStack alignment="center" spacing={ 3 }>
			<FlexBlock>{ name }</FlexBlock>
			<Button
				icon={ lineSolid }
				label={ __( 'Remove shadow', 'create-block-theme' ) }
				onClick={ onRemove }
				className="cbt-palette-swatch-button"
			/>
		</HStack>
	</Item>
);

const ShadowsTab = () => {
	const [ removedDefaults, setRemovedDefaults ] = useState( [] );

	const removeDefault = ( slug ) =>
		setRemovedDefaults( [ ...removedDefaults, slug ] );

	const restoreDefaults = () => setRemovedDefaults( [] );

	const visibleDefaults = CORE_SHADOW_DEFAULTS.filter(
		( d ) => ! removedDefaults.includes( d.slug )
	);

	return (
		<VStack spacing={ 4 }>
			<Text>
				{ __(
					'Remove default shadow presets you don’t want available in the editor. To create or edit shadow values, use the Site Editor’s Styles → Shadows panel.',
					'create-block-theme'
				) }
			</Text>
			<VStack spacing={ 1 }>
				<HStack
					className="cbt-palette-section-header"
					justify="space-between"
					alignment="center"
				>
					<BaseControl.VisualLabel>
						{ __( 'Default shadows', 'create-block-theme' ) }
					</BaseControl.VisualLabel>
					<DropdownMenu
						icon={ moreVertical }
						label={ __( 'Options', 'create-block-theme' ) }
						controls={ [
							{
								title: __(
									'Restore all defaults',
									'create-block-theme'
								),
								onClick: restoreDefaults,
							},
						] }
					/>
				</HStack>
				{ visibleDefaults.length > 0 && (
					<ItemGroup isBordered isSeparated>
						{ visibleDefaults.map( ( entry ) => (
							<ShadowRow
								key={ entry.slug }
								name={ entry.name }
								onRemove={ () => removeDefault( entry.slug ) }
							/>
						) ) }
					</ItemGroup>
				) }
			</VStack>
		</VStack>
	);
};

const TemplatesTab = () => (
	<>
		<PanelBody
			title={ __( 'Template Parts', 'create-block-theme' ) }
			initialOpen
		>
			<TemplatePartsPanel />
		</PanelBody>
		<PanelBody
			title={ __( 'Custom Templates', 'create-block-theme' ) }
			initialOpen
		>
			<CustomTemplatesPanel />
		</PanelBody>
	</>
);

const TypographyTab = () => (
	<>
		<PanelBody title={ __( 'Settings', 'create-block-theme' ) } initialOpen>
			<TypographySettingsPanel />
		</PanelBody>
		<PanelBody title={ __( 'Families', 'create-block-theme' ) } initialOpen>
			<FontFamiliesPanel />
		</PanelBody>
		<PanelBody title={ __( 'Sizes', 'create-block-theme' ) } initialOpen>
			<FontSizesPanel />
		</PanelBody>
	</>
);

export const EditThemeSettingsModal = ( { onRequestClose } ) => {
	const themeData = useSelect(
		( select ) => select( 'core' ).getCurrentTheme(),
		[]
	);

	const handleUpdateClick = () => {};

	const tabs = [
		{ name: 'color', title: __( 'Color', 'create-block-theme' ) },
		{
			name: 'dimensions',
			title: __( 'Dimensions', 'create-block-theme' ),
		},
		{
			name: 'typography',
			title: __( 'Typography', 'create-block-theme' ),
		},
		{
			name: 'shadows',
			title: __( 'Shadows', 'create-block-theme' ),
		},
		{
			name: 'templates',
			title: __( 'Templates', 'create-block-theme' ),
		},
	];

	const renderTab = ( tab ) => {
		switch ( tab.name ) {
			case 'color':
				return <ColorTab />;
			case 'dimensions':
				return <DimensionsTab />;
			case 'typography':
				return <TypographyTab />;
			case 'shadows':
				return <ShadowsTab />;
			case 'templates':
				return <TemplatesTab />;
			default:
				return null;
		}
	};

	return (
		<Modal
			size="large"
			title={ sprintf(
				// translators: %s: theme name.
				__( 'Theme Settings for %s', 'create-block-theme' ),
				themeData?.name?.raw ?? ''
			) }
			onRequestClose={ onRequestClose }
			className="create-block-theme__edit-theme-settings-modal"
		>
			<VStack spacing={ 4 }>
				<Text>
					{ __(
						'Edit the settings of the current theme.',
						'create-block-theme'
					) }
				</Text>
				<TabPanel
					className="create-block-theme__edit-theme-settings-tabs"
					tabs={ tabs }
				>
					{ renderTab }
				</TabPanel>
			</VStack>
			<HStack
				justify={ 'flex-end' }
				className="create-block-theme__edit-theme-settings-modal__footer"
			>
				<Button
					variant="primary"
					onClick={ handleUpdateClick }
					disabled
				>
					{ __( 'Update', 'create-block-theme' ) }
				</Button>
			</HStack>
		</Modal>
	);
};
