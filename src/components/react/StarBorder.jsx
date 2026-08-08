import './StarBorder.css';

const StarBorder = ({
  as: Component = 'button',
  className = '',
  color = '#ffffff',
  goldColor = '#fff8df',
  speed = '6s',
  thickness = 1,
  children,
  style = undefined,
  ...rest
}) => {
  const movingGlow = `conic-gradient(from 0deg, transparent 0deg 138deg, ${goldColor} 156deg, ${color} 174deg, ${goldColor} 192deg, transparent 210deg 360deg)`;

  return (
    <Component
      className={`star-border-container ${className}`}
      style={{ padding: `${thickness}px 0`, ...style }}
      {...rest}
    >
      <span
        className="border-gradient-bottom"
        style={{ background: movingGlow, animationDuration: speed }}
        aria-hidden="true"
      />
      <span
        className="border-gradient-top"
        style={{ background: movingGlow, animationDuration: speed }}
        aria-hidden="true"
      />
      <span className="inner-content">{children}</span>
    </Component>
  );
};

export default StarBorder;
